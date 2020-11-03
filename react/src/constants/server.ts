export default !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://win-condition.me';
