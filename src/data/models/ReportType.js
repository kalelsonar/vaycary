import DataType from 'sequelize';
import Model from '../sequelize';

const ReportType = Model.define('ReportType', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    
    reportType: {
        type: DataType.STRING,
        allowNull: false,
    },

    reportContent: {
        type: DataType.STRING,
        allowNull: false,
    },

    isActive: {
        type: DataType.BOOLEAN,
        defaultValue: true
    }
});

export default ReportType;