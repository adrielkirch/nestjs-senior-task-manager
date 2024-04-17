import { Controller, Get } from '@nestjs/common';

@Controller()
export class DefaultController {
  @Get()
  defaultRoute() {
    return 'Hello, Nest.js!';
  }
}
