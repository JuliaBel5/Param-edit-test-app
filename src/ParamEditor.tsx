import { Component } from "react";
import {
  TextInput,
  Box,
  Button,
  Group,
  Text,
  Paper,
  Stack,
  Title,
} from "@mantine/core";

export interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
  onSave?: (model: Model) => void;
}

interface State {
  paramValues: ParamValue[];
  colors: string[];
  showModel: boolean;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: [...props.model.paramValues],
      colors: [...props.model.colors],
      showModel: false,
    };
  }

  private handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      ),
    }));
  };

  private handleSave = () => {
    const { paramValues, colors } = this.state;
    const model = { paramValues, colors };
    if (this.props.onSave) {
      this.props.onSave(model);
    }
    this.toggleShowModel();
  };

  private toggleShowModel = () => {
    this.setState((prevState) => ({ showModel: !prevState.showModel }));
  };

  render() {
    const { params } = this.props;
    const { paramValues, showModel } = this.state;

    return (
      <Paper
        shadow="sm"
        p="lg"
        radius={15}
        display="flex"
        style={{ flexDirection: "column", gap: "15px" }}
      >
        <Title>Редактор параметров</Title>
        {params.map((param) => (
          <Box key={param.id} mb="md">
            <Group justify="space-between">
              <Text>{param.name}</Text>
              <TextInput
                value={
                  paramValues.find((p) => p.paramId === param.id)?.value || ""
                }
                onChange={(e) =>
                  this.handleInputChange(param.id, e.target.value)
                }
              />
            </Group>
          </Box>
        ))}
        <Stack justify="center">
          <Button mt="md" onClick={this.handleSave}>
            {showModel
              ? "Скрыть параметры модели"
              : "Отобразить параметры модели"}
          </Button>
          {showModel && (
            <Box>
              <Text>Параметры модели:</Text>
              {params.map((param) => (
                <Box key={param.id} mb="md">
                  <Group justify="space-between">
                    <Text>{param.name}</Text>
                    <Text>
                      {paramValues.find((p) => p.paramId === param.id)?.value ||
                        "Нет значения"}
                    </Text>
                  </Group>
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </Paper>
    );
  }
}

export default ParamEditor;
