import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')  // Nombre de la tabla en MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: ['Administrador', 'Recepcionista', 'Repartidor', 'Supervisor'],
  })
  rol: string;

  @Column({ length: 2 })
  status: string;
}
