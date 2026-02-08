import { useState } from "react";
import Layout from "./layouts/Layout";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [lastResultsDate, setLastResultsDate] = useState<string | null>(null);

  return (
    <Layout {...{ lastResultsDate }}>
      <ResultsPage {...{ setLastResultsDate }} />
    </Layout>
  );
}

export default App;
