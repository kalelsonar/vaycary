import DataType from 'sequelize';
import Model from '../sequelize';

const ListingData = Model.define('ListingData', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
  },

  bookingNoticeTime: {
    type: DataType.STRING,
  },

  checkInStart: {
    type: DataType.STRING,
  },

  checkInEnd: {
    type: DataType.STRING,
  },

  maxDaysNotice: {
    type: DataType.ENUM('unavailable', '3months', '6months', '9months', '12months', 'available'),
    defaultValue: 'unavailable',
  },

  minNight: {
    type: DataType.INTEGER,
  },

  maxNight: {
    type: DataType.INTEGER,
  },

  priceMode: {
    type: DataType.BOOLEAN,
  },

  basePrice: {
    type: DataType.DOUBLE,
    defaultValue: 0
  },

  cleaningPrice: {
    type: DataType.DOUBLE,
    defaultValue: 0
  },

  tax: {
    type: DataType.FLOAT,
    defaultValue: 0,
  },

  maxPrice: {
    type: DataType.FLOAT,
  },

  currency: {
    type: DataType.STRING,
  },

  hostingFrequency: {
    type: DataType.STRING,
  },

  weeklyDiscount: {
    type: DataType.STRING,
  },

  monthlyDiscount: {
    type: DataType.STRING,
  },

  cancellationPolicy: {
    type: DataType.INTEGER,
    defaultValue: 1,
  },

  taxRate: {
    type: DataType.FLOAT,
  },

});

export default ListingData;
