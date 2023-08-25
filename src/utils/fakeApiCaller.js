export default function fakeApiCall(dataToSend) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Erro na chamada da API'));
      } else {
        resolve(dataToSend);
      }
    }, 1000);
  });
}