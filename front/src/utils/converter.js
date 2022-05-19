export const convertSendDate = (data) => {
  const date = new Date(data.antdDatePicker);
  const time = new Date(data.antdTimePicker);
  const openAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
  delete data.antdDatePicker;
  delete data.antdTimePicker;
  const sendData = { ...data, openAt };
  return sendData;
};
