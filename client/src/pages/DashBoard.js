import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Box, Grid, Container, Typography } from "@mui/material";
import {
  CommitNumber,
  Time,
  IssueNumber,
  StarNumber,
  ForkNumber,
  ActivityIndex,
  TimeLine,
  Language,
  PullRequest,
  Contribute,
  CommitFrequency,
  IssueFrequency,
  ContributorList,
  Company,
} from "../components/DashBoard";
export default function DashboardApp() {
  useEffect(() => {
    getDashBoard(id);
  }, []);
  const { id } = useParams();
  const { isLoading, detail, getDashBoard } = useAppContext();
  const {
    forks,
    stars,
    open_issues,
    timeline,
    language,
    commit_frequency,
    issue_frequency,
    contributors,
  } = detail;

  if (isLoading) {
    return <Loading center />;
  } else {
    const contribute = {
      name: [],
      contributions: [],
    };

    if (contributors) {
      for (var i = 0; i < Math.min(5, contributors.length); ++i) {
        contribute.name.push(contributors[i].name);
        contribute.contributions.push(contributors[i].contributions);
      }
    }

    return (
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Report</Typography>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TimeLine {...timeline} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Time/>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <CommitNumber />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <IssueNumber total={open_issues} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <StarNumber total={stars} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <ForkNumber total={forks} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <ActivityIndex />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Language {...language} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PullRequest />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CommitFrequency {...commit_frequency} />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <IssueFrequency {...issue_frequency} />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Contribute {...contribute} />
            </Grid>
            {contributors && (
              <Grid item xs={12} sm={6} md={12}>
                <ContributorList {...contributors} />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={12}>
              <Company/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
