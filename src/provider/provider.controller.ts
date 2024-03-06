import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Provider } from './entities/provider.entity';

@ApiBearerAuth()
@ApiTags('provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @ApiOperation({ summary: 'create provider' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'all providers found' })
  // @ApiResponse({ status: 404, description: 'forbidden' })
  // findAll(@Query('limit') limit: string) {
  //   console.log('findAll:', limit);
  //   return this.providerService.findAll(limit);
  // }

  @Get(':providerId')
  @ApiOperation({ summary: 'one providerId found' })
  @ApiResponse({ status: 200, description: 'provider found', type: Provider })
  findProvider(@Param('providerId') providerId: string) {
    console.log('findProvider:', providerId);
    return this.providerService.findProvider(providerId);
  }

  // @Get('origin')
  // async findByCity(@Param('origin') origin: string): Promise<Provider[]> {
  //   return this.providerService.findByCity(origin);
  // }

  // @Get('findword')
  // findByWord(@Query('word') word: string) {
  //   return this.providerService.findByWord(word);
  // }

  @Put(':providerId')
  @ApiOperation({ summary: 'update provider' })
  updateProvider(
    @Param('providerId') providerId: number,
    @Body() provider: UpdateProviderDto,
  ) {
    return this.providerService.updateProvider(providerId, provider);
  }

  @Delete(':providerId')
  @ApiOperation({ summary: 'delete provider' })
  removeProvider(@Param('providerId') providerId: number) {
    return this.providerService.removeProvider(providerId);
  }

  @Get()
  findAllByOrigin(@Query('origin') origin: string) {
    console.log('findAllByOrigin:', origin);
    return this.providerService.findAllByOrigin(origin);
  }
}
