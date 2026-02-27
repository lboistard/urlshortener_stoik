import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateLinkUseCase } from "./create-link";
import {
  LinkRepositoryPort,
  LINK_REPOSITORY,
} from "../ports/link-repository.port";

describe("CreateLinkUseCase", () => {
  let useCase: CreateLinkUseCase;
  let repo: jest.Mocked<LinkRepositoryPort>;

  const mockLink = {
    id: "link-1",
    slug: "abc12XYZ",
    targetUrl: "https://example.com",
    createdAt: new Date(),
    clickCount: 0,
    userId: null,
  };

  beforeEach(async () => {
    repo = {
      findBySlug: jest.fn(),
      create: jest.fn(),
      incrementClickCountBySlug: jest.fn(),
      getSlugs: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLinkUseCase,
        { provide: LINK_REPOSITORY, useValue: repo },
      ],
    }).compile();

    useCase = module.get(CreateLinkUseCase);
  });

  it("creates a link when slug does not exist", async () => {
    repo.findBySlug.mockResolvedValue(null);
    repo.create.mockResolvedValue(mockLink);

    const result = await useCase.execute({
      targetUrl: "https://example.com",
    });

    expect(repo.findBySlug.mock.calls).toHaveLength(1);
    expect(repo.create.mock.calls).toHaveLength(1);
    const createCallArg = repo.create.mock.calls[0][0];
    expect(createCallArg).toEqual({
      userId: undefined,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slug: expect.any(String),
      targetUrl: "https://example.com",
    });
    expect(result).toEqual(mockLink);
  });

  it("retries with a new slug when slug already exists (collision)", async () => {
    const newLink = {
      ...mockLink,
      id: "link-2",
      slug: "xY9kL2mN",
    };

    repo.findBySlug.mockResolvedValueOnce(mockLink).mockResolvedValueOnce(null);
    repo.create.mockResolvedValue(newLink);

    const result = await useCase.execute({
      targetUrl: "https://example.com",
    });

    expect(repo.findBySlug.mock.calls).toHaveLength(2);
    expect(repo.create.mock.calls).toHaveLength(1);
    const createCallArg = repo.create.mock.calls[0][0];
    expect(createCallArg).toMatchObject({
      targetUrl: "https://example.com",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slug: expect.stringMatching(/^[A-Za-z0-9_-]{8}$/),
    });
    expect(result).toEqual(newLink);
  });

  it("retries on P2002 unique violation and succeeds with new slug", async () => {
    const prismaError = { code: "P2002" };
    const newLink = {
      ...mockLink,
      slug: "aB3cD4eF",
    };

    repo.findBySlug.mockResolvedValue(null);
    repo.create
      .mockRejectedValueOnce(prismaError)
      .mockResolvedValueOnce(newLink);

    const result = await useCase.execute({
      targetUrl: "https://example.com",
    });

    expect(repo.create.mock.calls).toHaveLength(2);
    expect(result).toEqual(newLink);
  });

  it("throws ConflictException when unique slug cannot be found after max attempts", async () => {
    repo.findBySlug.mockResolvedValue(mockLink);

    await expect(
      useCase.execute({ targetUrl: "https://example.com" }),
    ).rejects.toThrow(ConflictException);

    expect(repo.findBySlug.mock.calls).toHaveLength(10);
    expect(repo.create.mock.calls).toHaveLength(0);
  });

  it("rethrows non-P2002 errors from create", async () => {
    repo.findBySlug.mockResolvedValue(null);
    repo.create.mockRejectedValue(new Error("DB connection failed"));

    await expect(
      useCase.execute({ targetUrl: "https://example.com" }),
    ).rejects.toThrow("DB connection failed");
  });
});
