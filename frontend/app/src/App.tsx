import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Sample } from "./Sample";

const client = new ApolloClient({
  uri: "https://tdiaryapi.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Sample />
    </ApolloProvider>
  );
}

export default App;
