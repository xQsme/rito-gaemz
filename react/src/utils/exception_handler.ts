export const handleRequestException = (ex:any) => {
    if (!ex.response || ex.response.status === 500) {
        return 'Unable to communicate with the server';
    }
    if (ex.response.data.parameterViolations) {
        return ex.response.data.parameterViolations;
    }
    if (ex.response.data) {
        return String(ex.response.data);
    }
}