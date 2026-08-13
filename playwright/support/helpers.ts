export function generateOrderCode() {
    const prefix = 'VLO';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return `${prefix}-${code}`;
  }