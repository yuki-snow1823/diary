import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Sample } from "./Sample";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://tdiaryapi.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/sample" element={<Sample />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
