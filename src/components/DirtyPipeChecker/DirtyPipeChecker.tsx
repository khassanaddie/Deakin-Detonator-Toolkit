import { Button, LoadingOverlay, NumberInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";
import { CommandHelper } from "../../utils/CommandHelper";
import ConsoleWrapper from "../ConsoleWrapper/ConsoleWrapper";

interface FormValues {
    ip: string;
    osys: string;
    kernel: number;
}

const DirtyPipeChecker = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");

    let form = useForm({
        initialValues: {
            ip: "",
            osys: "",
            kernel: 0,
        },
    });

    const onSubmit = async (values: FormValues) => {
        setLoading(true);

        const args = [values.ip, "-p", values.osys, `${values.kernel}`];
        const output = await CommandHelper.runCommand("dirtypipechecker", args);

        setOutput(output);
        setLoading(false);
    };

    const clearOutput = useCallback(() => {
        setOutput("");
    }, [setOutput]);

    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <LoadingOverlay visible={loading} />
            <Stack>
                <Title>SNMP Enumeration tool</Title>
                <TextInput label={"IP or Hostname"} required {...form.getInputProps("ip")} />
                <TextInput label={"Operating System"} {...form.getInputProps("osys")} />
                <NumberInput label={"Kernel Version"} {...form.getInputProps("kernel")} />
                <Button type={"submit"}>Scan</Button>
                <ConsoleWrapper output={output} clearOutputCallback={clearOutput} />
            </Stack>
        </form>
    );
};

export default DirtyPipeChecker;
