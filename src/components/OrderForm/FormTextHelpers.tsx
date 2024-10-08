import { Typography } from "@mui/joy";
import React from "react";

export const ErrorText = React.memo(
  ({ children, testId }: { children: React.ReactNode; testId: string }) => (
    <Typography
      data-testid={testId}
      color="danger"
      fontSize={12}
      sx={{ mt: 0.5 }}
    >
      {children}
    </Typography>
  )
);

export const InfoText = React.memo(
  ({ children }: { children: React.ReactNode }) => (
    <Typography color="neutral" fontSize={12} sx={{ mt: 0.5 }}>
      {children}
    </Typography>
  )
);
