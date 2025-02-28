import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'


dotenv.config()


export const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  //port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'testing_system',
  entities: [__dirname + '/../common/entities/*{.js,.ts}'],
  migrations: [__dirname + '/../database/migrations/*{.js,.ts}'],
  synchronize: false,
  logging: false /* process.env.NODE_ENV !== 'production',*/,
}

// export the database module
export const DatabaseModule = TypeOrmModule.forRoot(config)

// only for type orm cli use //
// --------------------------------- //
export default new DataSource(config)
// -------------------------------- //
// only for type orm cli use //
