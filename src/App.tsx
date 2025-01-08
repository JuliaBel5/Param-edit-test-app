import { Box } from "@mantine/core";
import ParamEditor, { Model, Param } from "./ParamEditor";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

const App = () => {
  const getModel = (updatedModel: Model) => {
    console.log("Сохранено:", updatedModel);
  };

  return (
    <Box>
      <ParamEditor params={params} model={model} onSave={getModel} />
    </Box>
  );
};

export default App;
