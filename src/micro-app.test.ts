import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import microApp from "./micro-app.ts";

Deno.test("auto trigger undefined", () => {
  function callback(payload: any) {
    assertEquals(payload, undefined);
  }
  microApp.addDataListener("test", callback, true);
  microApp.removeDataListener("test", callback);
});

Deno.test("get data undefined", () => {
  const data = microApp.getData("test");
  assertEquals(data, undefined);
});

Deno.test("auto trigger data", () => {
  function callback(payload: any) {
    assertEquals(payload, { type: "test" });
  }
  microApp.setData("test", { type: "test" });
  microApp.addDataListener("test", callback, true);
  microApp.removeDataListener("test", callback);
});

Deno.test("set data", () => {
  function callback(payload: any) {
    assertEquals(payload, { type: "test" });
  }
  microApp.addDataListener("test", callback);
  microApp.setData("test", { type: "test" });
  microApp.removeDataListener("test", callback);
});

Deno.test("get data", () => {
  microApp.setData("test", { type: "test" });
  const data = microApp.getData("test");
  assertEquals(data, { type: "test" });
});

Deno.test("remove data listener", () => {
  function callback(payload: any) {
    assertEquals(payload, { type: "test" });
  }
  microApp.addDataListener("test", callback);
  microApp.removeDataListener("test", callback);
  assertEquals(microApp.listener["test"], []);
});

Deno.test("clear data listener", () => {
  function callback(payload: any) {
    assertEquals(payload, { type: "test" });
  }
  microApp.addDataListener("test", callback);
  microApp.clearDataListener("test");
  assertEquals(microApp.listener["test"], []);
});
