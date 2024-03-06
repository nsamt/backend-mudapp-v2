import { HttpException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Provider } from '../provider/entities/provider.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    // @InjectRepository(Provider) private providerRepository: Repository<Provider>,
    @InjectDataSource() private dataSource: DataSource,
    // @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async newTransport(createTicketDto: CreateTicketDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // console.log('This is the id from createTicketDto: ' + createTicketDto.provider.id);

      const availableProvider = await queryRunner.manager.findOne(Provider, {
        where: { id: createTicketDto.provider.id, availability: true },
      });
      console.log(
        'This is the id from createTicketDto: ' + createTicketDto.provider.id,
      );
      if (!availableProvider) {
        throw new HttpException('No disponible', 404);
      }
      const ticket = await queryRunner.manager.save(Ticket, createTicketDto);

      availableProvider.availability = false;
      await queryRunner.manager.save(Provider, availableProvider);
      await queryRunner.commitTransaction();
      return ticket;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Ticket[]> {
    // return `This action returns all ticket`;
    return this.ticketRepository.find();
  }

  async findTicket(orderId: string): Promise<Ticket> {
    return this.ticketRepository.findOneBy({ orderId: +orderId });
  }
  
  async findTicketById(userId: string): Promise<Ticket> {
    return this.ticketRepository.findOneBy({ userId : +userId });
  }

  async removeTicket(orderId: number) {
    const deleteTicket = await this.ticketRepository.delete({
      orderId: orderId,
    });
    if (deleteTicket) return { message: 'ticket removed' };
  }

  async updateTicket(orderId: number, ticket: UpdateTicketDto) {
    const update = await this.ticketRepository.update(
      { orderId: orderId },
      ticket,
    );
    if (update) {
      return { message: 'ticket updated' };
    }
  }
}
