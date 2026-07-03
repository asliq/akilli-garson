import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { GetPublicMenuQuery } from '../queries/get-public-menu.query';
import { GetPublicMenuResult } from '../results/get-public-menu.result';
import { PublicMenuRepositoryPort } from '../ports/public-menu.repository.port';
import { PUBLIC_MENU_REPOSITORY } from '../ports/tokens';

@Injectable()
export class GetPublicMenuUseCase {
  constructor(
    @Inject(PUBLIC_MENU_REPOSITORY)
    private readonly publicMenuRepository: PublicMenuRepositoryPort,
  ) {}

  async execute(query: GetPublicMenuQuery): Promise<GetPublicMenuResult> {
    const normalizedToken = query.tableToken.trim();

    const menu = await this.publicMenuRepository.findByTableToken(normalizedToken);
    if (!menu) {
      throw new NotFoundException('Table', normalizedToken);
    }

    return GetPublicMenuResult.fromReadModel(menu);
  }
}
