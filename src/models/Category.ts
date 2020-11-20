import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn,
} from 'typeorm';

class Category {
  id: string;

  title: string;

  created_at: Date;

  updated_at: Date;
}

export default Category;
