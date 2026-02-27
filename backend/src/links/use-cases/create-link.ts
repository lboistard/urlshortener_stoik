import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Link } from "../domain/link";
import {
  LinkRepositoryPort,
  LINK_REPOSITORY,
} from "../ports/link-repository.port";

const MAX_SLUG_ATTEMPTS = 10;

@Injectable()
export class CreateLinkUseCase {
  constructor(
    @Inject(LINK_REPOSITORY) private readonly repo: LinkRepositoryPort,
  ) {}

  async execute(input: { userId?: string; targetUrl: string }) {
    const { slug: initialSlug, targetUrl } = Link.create(input.targetUrl);
    let candidateSlug = initialSlug;

    // This loop is the colision testing loop to avoid a generated slug to be identical as
    // a slug stored in the database.
    for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
      const existing = await this.repo.findBySlug(candidateSlug);
      if (!existing) {
        try {
          return await this.repo.create({
            userId: input.userId,
            slug: candidateSlug,
            targetUrl,
          });
        } catch (err: unknown) {
          const isUniqueViolation =
            err &&
            typeof err === "object" &&
            "code" in err &&
            (err as { code?: string }).code === "P2002";
          if (isUniqueViolation && attempt < MAX_SLUG_ATTEMPTS - 1) {
            candidateSlug = Link.createRandomSlug();
            continue;
          }
          throw err;
        }
      }
      candidateSlug = Link.createRandomSlug();
    }

    throw new ConflictException("Could not generate a unique slug");
  }
}
