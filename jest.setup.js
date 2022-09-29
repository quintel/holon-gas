import "@testing-library/jest-dom/extend-expect";

// Stub out react-markdown which doesn't work in Jest due to Jest's support for ESM.
// https://github.com/remarkjs/react-markdown/issues/635
// eslint-disable-next-line react/display-name
jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => undefined);
