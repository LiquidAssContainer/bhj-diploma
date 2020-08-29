const createRequest = (options = {}) => {
  return new Promise((resolve, reject) => {
    let { url, method, data, responseType } = options;

    if (method === 'GET') {
      url += '?';
      for (let item in data) {
        url += `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}&`;
      }
      url = url.slice(0, -1);
    }

    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.withCredentials = true;
    xhr.responseType = responseType;

    try {
      if (method === 'GET') {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.onerror = () => {
          reject(new Error('Ошибка'));
        };
        xhr.send();
      } else {
        xhr.onloadend = () => {
          resolve(xhr.response);
        };

        let formData = new FormData();
        for (let item in options.data) {
          formData.append(item, options.data[item]);
        }
        xhr.send(formData);
      }
    } catch (err) {
      reject(err);
    }
  });
};
