/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}
  create(provider: CreateProviderDto) {
    return this.providerRepository.save(
      this.providerRepository.create(provider),
    );
  }

  findAll(limit: string) {
    // return `This action returns all provider`;
    let options: FindManyOptions<Provider>;
    if (limit) options = { take: +limit };
    return this.providerRepository.find(options);
  }

  findProvider(providerId: string): Promise<Provider> {
    // return `This action returns a #${id} provider`;
    if(Number.isNaN(+providerId))
      throw new HttpException('Not a valid id', 400);
    return this.providerRepository.findOneBy({ id: +providerId });
  }

  // async findByOrigin(origin: string): Promise<Provider[]> {
  //   try {
  //     const providers = await this.providerRepository.find({
  //       [`origin.${origin}`]: true,
  //     });
  //     return providers;
  //   } catch (error) {
  //     throw new Error(
  //       `Error al buscar propiedades por ciudad: ${error.message}`,
  //     );
  //   }
  // }

  async findAllByOrigin(origin: string) {
    console.log('findAllByOrigin:', origin);
    return this.providerRepository.find({where: { origin }});
  }

  // async findByWord(word: string): Promise<Provider[]> {
  //   try {
  //     return await this.providerRepository
  //       .createQueryBuilder('provider')
  //       .where('provider.providerName LIKE :word', { word: `%${word}%` })
  //       .orWhere('provider.email LIKE :word', { word: `%${word}%` })
  //       .orWhere('provider.origin LIKE :word', { word: `%${word}%` })
  //       // Add other fields you want to search here
  //       .getMany();
  //   } catch (error) {
  //     throw new Error(`Error searching providers by keyword: ${error.message}`);
  //   }
  // }

  async updateProvider(providerId: number, provider: UpdateProviderDto) {
    const update = await this.providerRepository.update(
      { id: providerId },
      provider,
    );
    if (update) {
      return { message: 'provider updated' };
    }
  }

  async removeProvider(providerId: number) {
    const deleteProvider = await this.providerRepository.delete({
      id: providerId,
    });
    if (deleteProvider) return { message: 'provider removed' };
  }
}
