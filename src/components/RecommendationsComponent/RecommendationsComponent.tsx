import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from "@backstage/core-components";
import useAsync from "react-use/lib/useAsync";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles({
  description: {
    maxWidth: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

type Template = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  owner: string;
};

type DenseTableProps = {
  templates: Template[];
  onFeedback: (templateId: string, feedback: "thumbsUp" | "thumbsDown") => void;
};

export const DenseTable = ({ templates, onFeedback }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    { title: "Tags", field: "tags" },
    { title: "Owner", field: "owner" },
    { title: "Feedback", field: "feedback" },
  ];

  const data = templates.map((template) => {
    return {
      title: template.title,
      description: (
        <div className={classes.description}>{template.description}</div>
      ),
      tags: template.tags.join(", "),
      owner: template.owner,
      feedback: (
        <>
          <IconButton
            onClick={() => onFeedback(template.id, "thumbsUp")}
            aria-label="Thumbs Up"
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            onClick={() => onFeedback(template.id, "thumbsDown")}
            aria-label="Thumbs Down"
          >
            <ThumbDownIcon />
          </IconButton>
        </>
      ),
    };
  });

  return (
    <Table
      title="Recommended Templates"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const RecommendationsComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<Template[]> => {
    const response = await fetch("/api/recommendations"); // external API
    return await response.json();
  }, []);

  const handleFeedback = async (
    templateId: string,
    feedback: "thumbsUp" | "thumbsDown"
  ) => {
    try {
      await fetch("/api/feedback", {
        // external API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId, feedback }),
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable templates={value || []} onFeedback={handleFeedback} />;
};
