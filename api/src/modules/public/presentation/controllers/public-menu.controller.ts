import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetPublicMenuUseCase } from '../../application/use-cases/get-public-menu.use-case';
import { PublicMenuApiExamples } from '../constants/public-menu-api.examples';
import { PublicMenuResponseDto } from '../dto/responses/public-menu.response.dto';
import { PublicMenuPresentationMapper } from '../mappers/public-menu.presentation.mapper';

@ApiTags('Public Menu')
@Controller('public/menu')
export class PublicMenuController {
  constructor(private readonly getPublicMenuUseCase: GetPublicMenuUseCase) {}

  @Get(':tableToken')
  @ApiOperation({ summary: 'Get public menu for a table (no authentication required)' })
  @ApiParam({
    name: 'tableToken',
    description: 'QR code table token',
    example: 'qr-abc123',
  })
  @ApiOkResponse({
    description: 'Public menu retrieved successfully',
    schema: {
      example: PublicMenuApiExamples.menuResponse,
    },
  })
  @ApiNotFoundResponse({
    description: 'Table not found or inactive',
    schema: {
      example: {
        ...PublicMenuApiExamples.errorEnvelope,
        statusCode: 404,
        message: "Table with id 'qr-abc123' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  async getMenu(@Param('tableToken') tableToken: string): Promise<PublicMenuResponseDto> {
    const result = await this.getPublicMenuUseCase.execute(
      PublicMenuPresentationMapper.toQuery(tableToken),
    );

    return PublicMenuPresentationMapper.toResponse(result);
  }
}
