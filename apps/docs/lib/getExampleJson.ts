import kitchen_sink from "./schemas/examples/kitchen_sink.json";
import basic from "./schemas/examples/basic.json";

const keys = {
  kitchen_sink,
  basic,
};

export default function getExampleJson(key: string) {
  return keys[key];
}
