import { Warning } from './warnings/common';
import { statement } from './factory';

export default (data: any): Warning[] => statement(data, ['statement']);
