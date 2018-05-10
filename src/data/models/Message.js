import DataType from 'sequelize';
import Model from '../sequelize';

const Message = Model.define(
  'Message',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    title: {
      type: DataType.STRING(255),
      defaultValue: false,
      validate: { notEmpty: true },
    },

    content: {
      type: DataType.TEXT,
      defaultValue: false,
      validate: { notEmpty: true },
    },
  },
  {
    indexes: [{ fields: ['title'] }],
  },
);

export default Message;
