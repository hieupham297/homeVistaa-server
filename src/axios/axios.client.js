import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default { get };

// axios-thư viện http client được sử dụng
// để thực hiện các yêu cầu HTTP như GET, POST, PUT, DELETE 
// từ client tới server và xử lý các phản hồi trả về.
