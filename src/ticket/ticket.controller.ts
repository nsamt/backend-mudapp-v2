/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// @ApiBearerAuth()
@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: 'create ticket' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  newTransport(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.newTransport(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'all tickets found' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'one ticket found' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  findTicket(@Param('orderId') orderId: string) {
    return this.ticketService.findTicket(orderId);
  }

  @Get('/byuser/:userId')
  @ApiOperation({ summary: 'one ticket found' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  findTicketById(@Param('userId') userId: string) {
    return this.ticketService.findTicketById(userId);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'one ticket deleted' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  removeTicket(@Param('orderId') orderId: number) {
    return this.ticketService.removeTicket(orderId);
  }

  @Put(':orderId')
  @ApiOperation({ summary: 'one ticket updated' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  updateTicket(
    @Param('orderId') orderId: number,
    @Body() ticket: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(orderId, ticket);
  }
}
