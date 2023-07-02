import { useCallback } from "react";
import { theme } from "@/utils/theme";
import { Text, Grid } from "@/components/elements";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(
      (path: string) => {
        navigate(`/${path}`);
      },
      [navigate]
  );

  return { operations: { handleClick } };
};

type Props = { page: "Profile" | "Browse" | "Account" };

export const Header: React.FC<Props> = ({ page }) => {
  const textH = "40px";
  const list = [
    { text: "Profile", path: "profile" },
    { text: "Browse", path: "browse" },
    { text: "Account", path: "account" },
  ];
  const { operations } = useHeader();
  return (
      <Grid templateColumns="repeat(3, 1fr)" w={theme.w.thread}>
        {list.map((ele, index) => (
            <Text
                key={ele.text}
                cursor="pointer"
                bg={ele.text === page ? "blue.100" : "initial"}
                h={textH}
                lineHeight={textH}
                borderLeft={theme.border}
                borderRight={index === list.length - 1 ? theme.border : ""}
                borderBottom={theme.border}
                textAlign={"center"}
                onClick={() => operations.handleClick(ele.path)}
            >
              {ele.text}
            </Text>
        ))}
      </Grid>
  );
};