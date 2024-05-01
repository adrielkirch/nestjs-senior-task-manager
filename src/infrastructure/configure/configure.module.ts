// Import the Module decorator from the '@nestjs/common' package
import { Module } from '@nestjs/common';

// Import the ConfigModule and ConfigService from the '@nestjs/config' package
import { ConfigModule, ConfigService } from '@nestjs/config';

// Import the ThrottlerModule from the '@nestjs/throttler' package
import { ThrottlerModule } from '@nestjs/throttler';

// Decorate the ConfigureModule class with the @Module decorator
@Module({
  // Specify the modules to be imported by the ConfigureModule
  imports: [
    // Import the ConfigModule and configure it to load environment variables from a file
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global, so its configuration is available everywhere
      envFilePath: '.env', // Specify the path to the .env file for loading environment variables
    }),
    
    // Import the ThrottlerModule and configure it asynchronously using the ConfigService
    ThrottlerModule.forRootAsync({
      inject: [ConfigService], // Inject the ConfigService to access environment variables
      imports: [ConfigModule], // Import the ConfigModule to make its functionality available
      useFactory: async (config: ConfigService) => [ // Define a factory function to create ThrottlerModule options
        {
          ttl: config.get<number>('THROTTLE_TTL'), // Get the throttle time-to-live from environment variables
          limit: config.get<number>('THROTTLE_LIMIT'), // Get the throttle limit from environment variables
        },
      ],
    }),
  ],
})
export class ConfigureModule {}
