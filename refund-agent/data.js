[
  {
    id: "b6e31609f7a8e2658471cfb933492a0c",
    value: {
      actionRequests: [
        {
          name: "refund",
          args: {
            input: '{"emailIds": ["18c3f2a1b5d6e789", "18c3d5b8e1f3a456"]}',
          },
          description:
            'Refund pending approval\n\nTool: refund\nArgs: {\n  "input": "{\\"emailIds\\": [\\"18c3f2a1b5d6e789\\", \\"18c3d5b8e1f3a456\\"]}"\n}',
        },
      ],
      reviewConfigs: [
        {
          actionName: "refund",
          allowedDecisions: ["approve", "edit", "reject"],
        },
      ],
    },
  },
];
