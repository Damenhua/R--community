import { useState, useEffect } from "react";
import "./style.css";
import supabase from "./supabase";
const CATEGORIES = [
  { name: "technology", color: "#ca8a04" },
  { name: "science", color: "#ca8a04" },
  { name: "finance", color: "#ca8a04" },
  { name: "society", color: "#ca8a04" },
  { name: "entertainment", color: "#ca8a04" },
  { name: "health", color: "#ca8a04" },
  { name: "history", color: "#ca8a04" },
  { name: "news", color: "#ca8a04" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);

  useEffect(function () {
    async function getFacts() {
      const { data: factContents, error } = await supabase
        .from("fact-contents")
        .select("*");
      setFacts(factContents);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter />
        <FactsList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="helpful-tips-icon.svg" height="68" width="69" alt="logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        onClick={() => setShowForm((show) => !show)}
        className="btn btn-large share"
      >
        {showForm ? "Close" : "Share your thoughts"}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("https://example.com");
  const [category, setCategory] = useState("");

  function isValidUrl(urlString) {
    let url;
    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handleSubmit(e) {
    //
    e.preventDefault();

    // 2. Check if the input is valid
    if (text && isValidUrl(source) && category && text.length <= 200) {
      console.log("Good");
      // 3. Creat new  fact
      const newFact = {
        id: Math.round(Math.random() * 10000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      // 4. render new fact
      setFacts((facts) => [newFact, ...facts]);
      // 5. Clear the input
      setText("");
      setSource("https://example.com");
      setCategory("");
      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="share your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose a category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large post">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      {/* All  */}
      <ul>
        <li className="category">
          <button className="btn btn-all">All</button>
        </li>

        {/* Category */}
        {CATEGORIES.map((item) => (
          <li key={item.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: item.color }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList({ facts }) {
  if (facts.length === 0) {
    return <p className="no-facts">No facts for this category yet!</p>;
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <FactItems key={fact.id} fact={fact} />
        ))}
      </ul>
    </section>
  );
}

function FactItems({ fact }) {
  return (
    <li key={fact.id} className="fact-content">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-btn">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
