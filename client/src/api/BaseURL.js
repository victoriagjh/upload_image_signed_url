/**
 * 환경변수 및 실행 환경에 따라 Base URL을 반환하는 팩토리 함수
 */
const getBaseURL = () => {
  let baseURL = "http://localhost:8000";
  return baseURL;
};

// TODO: 팩토리 함수의 return 값이 아닌 함수를 export해야 함. 이후 일부 코드 변경해야 함.
// export default getBaseURL;
export default getBaseURL();
