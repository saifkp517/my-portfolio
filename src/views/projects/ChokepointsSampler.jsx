'use client'

import CTAButton from '../../components/CTAButton.jsx'
import ReportLayout, { ReportSection, ReportTable } from '../../components/report/ReportLayout.jsx'
import CoverPlaceholder from '../../components/report/CoverPlaceholder.jsx'
import { B, Callout, Code, CodeBlock, H3, List, OrderedList } from '../../components/report/Prose.jsx'
import { META_COLORS } from '../../data/iconColors.js'

const PROPERTIES = [
  { label: 'Project', value: 'Maritime choke points', color: META_COLORS.time, d: 'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM8 5v3.2' },
  { label: 'Runs on', value: 'Laptop CPU', color: META_COLORS.role, d: 'M2.5 3.5h11v7h-11v-7zM6 13.5h4' },
  { label: 'Embeddings', value: 'all-MiniLM-L6-v2 (384-dim)', color: META_COLORS.stack, d: 'M3 13V9M8 13V3M13 13V6' },
  { label: 'LLM calls', value: 'None', color: META_COLORS.email, d: 'M3.5 8.5l3 3 6-7' },
]

const SECTIONS = [
  { id: 'problem', label: 'The problem' },
  { id: 'embed', label: '1. Embed' },
  { id: 'dedupe', label: '2. Dedupe' },
  { id: 'cluster', label: '3. Cluster' },
  { id: 'split', label: '4. Split' },
  { id: 'rank', label: '5. Rank' },
  { id: 'representatives', label: '6. Representatives' },
  { id: 'report', label: '7. Report' },
  { id: 'stack', label: 'The stack' },
]

const MCS_ROWS = [
  ['30', '2'],
  ['1,000', '5'],
  ['9,000', '45'],
  ['50,000+', '100'],
]

const SIGNAL_ROWS = [
  [<B key="s">Sources</B>, 'How many different outlets covered it', 'One spammy site can’t inflate a topic'],
  [<B key="z">Size</B>, 'Total headlines, duplicates included', 'How much coverage overall'],
  [<B key="v">Velocity</B>, 'Is coverage speeding up or slowing down?', 'Separates the earthquake from Ukraine'],
]

const VELOCITY_ROWS = [
  ['Ukraine (steady)', '150', '150', '1.0'],
  ['Earthquake (breaking)', '0', '300', '301'],
  ['Election recap (fading)', '240', '60', '0.25'],
]

const NORMALIZE_ROWS = [
  ['Plain min-max', 'One giant outlier squashes everyone else near 0', 'Fine on 5 topics, fragile at scale'],
  [
    'Percentile ranks',
    <>
      Throws away <em>how big</em> the gaps are: 5 vs 6 outlets counts as a full step, and a big surge barely beats a
      flat line
    </>,
    <>
      The Fed cut fell <B>below the spam token</B> ✗
    </>,
  ],
  [
    <>
      <B>Clipped min-max</B> ✅
    </>,
    'Cap each term at its 5th/95th percentile, then min-max',
    'Outliers get capped, gaps are kept, Fed is back above spam',
  ],
]

const REPORT_ROWS = [
  [
    'Sources vs. headlines',
    <>
      <B>Coverage:</B> “14 headlines from 9 outlets (WIDE)” or “19 headlines from 5 outlets (CONCENTRATED: a few outlets
      repeating themselves)”
    </>,
  ],
  [
    'Velocity',
    <>
      <B>Momentum:</B> “SURGING: roughly 12x its earlier slice of the news”, or STEADY / FADING
    </>,
  ],
  [
    'Coherence',
    <>
      <B>Focus:</B> TIGHT (one event), FOCUSED, or BROAD (an ongoing story from many angles)
    </>,
  ],
  [
    'Median timestamp',
    <>
      <B>Freshness:</B> “typical headline is about 3 hours old”
    </>,
  ],
  ['Score', 'Not shown. Only the rank position is.'],
]

const RANK_OUTPUT = `
rank score |  sources  |   size    |  velocity   | coherence | topic
   1  0.93 |  9  1.00  | 14  0.72  | +2.47 1.00  | 0.80 1.00 | chile earthquake
   2  0.68 |  9  1.00  | 12  0.57  | -1.53 0.00  | 0.78 0.89 | portugal election
   3  0.64 |  8  0.79  | 16  0.86  | +0.00 0.36  | 0.64 0.00 | ukraine (steady)
   4  0.35 |  6  0.27  |  6  0.00  | +1.71 0.83  | 0.74 0.67 | fed rate cut
   5  0.31 |  5  0.00  | 19  1.00  | -0.52 0.22  | 0.67 0.16 | moondog token (spam)
`

const SAMPLE_REPORT = `
# News report

_This run: 67 headlines over about 47 hours, merged into 64 stories, grouped into 5 topics; 0 headlines were discarded as off-topic noise._

Top 5 topics, ranked.

## 1. chile, earthquake, quake, chile quake, quake chile

- **Coverage:** 14 headlines from 9 different outlets (WIDE: many independent outlets)
- **Momentum:** SURGING: roughly 12x its earlier slice of the news
- **Focus:** TIGHT: headlines are all about one specific event
- **Freshness:** typical headline is about 3 hours old

**Representative headlines**

- Magnitude 7.4 earthquake strikes southern Chile _(apnews, reuters)_
- Chile earthquake knocks out power to millions _(cnn)_
- Strong earthquake rocks Chile, tsunami warning issued _(bbc)_
- Death toll rises after Chile earthquake _(aljazeera)_
- Chile declares state of emergency after earthquake _(ft)_

## 2. portugal, election, portugal election, snap, right

- **Coverage:** 12 headlines from 9 different outlets (WIDE: many independent outlets)
- **Momentum:** FADING FAST: down to roughly 22% of its earlier slice of the news
- **Focus:** TIGHT: headlines are all about one specific event
- **Freshness:** typical headline is about 32 hours old

**Representative headlines**

- Portugal votes in snap general election _(reuters)_
- What Portugal's election result means for Europe _(economist)_
- Far-right surges in Portugal election results _(theguardian)_
- Portugal election: centre-right leads early count _(bbc)_
- Polls open in Portugal's snap election _(apnews)_

## 3. ukraine, russian, drones, kyiv, russian drones

- **Coverage:** 16 headlines from 8 different outlets (MODERATE)
- **Momentum:** STEADY: holding about the same slice of the news as earlier in the window
- **Focus:** BROAD: an ongoing story covered from many angles
- **Freshness:** typical headline is about 24 hours old

**Representative headlines**

- Fighting intensifies along eastern Ukraine front line _(aljazeera)_
- Ukraine says it repelled assault near Pokrovsk _(apnews)_
- Ukraine war: blackouts hit Kharkiv after energy attacks _(bbc)_
- Ukraine strikes Russian oil depot with long-range drones _(reuters)_
- Ukrainian forces hold ground in Donetsk region _(kyivindependent)_

## 4. fed, rates, cuts, rate, cut

- **Coverage:** 6 headlines from 6 different outlets (WIDE: many independent outlets)
- **Momentum:** SURGING: roughly 6x its earlier slice of the news
- **Focus:** FOCUSED: one story, covered from a few angles
- **Freshness:** typical headline is about 8 hours old

**Representative headlines**

- Fed cuts interest rates by a quarter point _(reuters)_
- Mortgage rates expected to ease after Fed cut _(nytimes)_
- Federal Reserve lowers rates for third time this year _(apnews)_
- Fed delivers rate cut, signals pause ahead _(bloomberg)_
- Wall Street rallies after Fed rate decision _(cnbc)_

## 5. moondog, token, moondog token, rally, new

- **Coverage:** 19 headlines from 5 different outlets (CONCENTRATED: a few outlets repeating themselves)
- **Momentum:** FADING: down to roughly 59% of its earlier slice of the news
- **Focus:** FOCUSED: one story, covered from a few angles
- **Freshness:** typical headline is about 25 hours old

**Representative headlines**

- MoonDog token soars 300% as investors pile in _(cryptopumpdaily, tokenalerts)_
- MoonDog token surges again as buyers rush in _(cryptopumpdaily)_
- MoonDog crypto rally: what investors need to know _(tokenalerts)_
- MoonDog token hits new all-time high _(tokenalerts)_
- MoonDog token listed on new exchange _(tokenalerts)_
`

export default function ChokepointsSampler() {
  return (
    <ReportLayout
      cover={<CoverPlaceholder />}
      eyebrow="Maritime choke points · Write-up 01"
      title="I wrote a clustering algorithm to ingest 10k+ news headlines, here’s how I did it and how each step works"
      subtitle="The sampler: embed → dedupe → cluster → split → rank → representatives → report."
      properties={PROPERTIES}
      sections={SECTIONS}
      action={
        <CTAButton href="/projects/chokepoints" variant="secondary">
          Back to project report
        </CTAButton>
      }
    >
      <div className="mb-10 text-[15px] leading-relaxed">
        <Callout>
          <p>
            <B>TL;DR:</B> ~10k raw headlines a day go in, a ranked list of topics comes out. Seven steps:{' '}
            <B>embed</B> (headline → vector), <B>dedupe</B> (rewrites → one story), <B>cluster</B> (stories →
            topics), <B>split</B> (un-glue topics that are really two stories), <B>rank</B> (score by sources, size,
            velocity and coherence), <B>pick representatives</B>, and <B>write a plain-language report</B>. Runs on a
            laptop CPU, costs $0 and makes zero LLM calls.
          </p>
        </Callout>
      </div>

      <ReportSection id="problem" title="The problem">
        <p>
          A GDELT news pull gives you roughly 9,000 headlines a day. Most of them are the same 200 things written 40
          different ways:
        </p>
        <List>
          <li>“Fed holds interest rates steady amid cooling inflation”</li>
          <li>“Federal Reserve keeps rates unchanged as price growth slows”</li>
        </List>
        <p>
          Same story, almost no shared words. Keyword matching won’t catch it. I wanted something that groups
          headlines by <B>meaning</B>, then tells me which groups actually matter right now.
        </p>
        <p>Here’s the whole system:</p>
        <CodeBlock>{`headlines file → embed → dedupe → cluster → split → rank → representatives → report.md`}</CodeBlock>
        <p>Each step is a small Python script that does one job. Let’s walk through them.</p>
      </ReportSection>

      <ReportSection id="embed" title="Step 1: Embed, turning text into numbers that capture meaning">
        <p>
          Computers can’t compare sentences, but they can compare lists of numbers. An <B>embedding model</B> turns
          each headline into a list of 384 numbers (a vector). Headlines that mean similar things end up with similar
          vectors.
        </p>
        <p>
          I used <Code>all-MiniLM-L6-v2</Code>, a small open-source model that runs locally. 9k headlines take under a
          minute on a laptop CPU.
        </p>
        <CodeBlock language="Python">{`
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device="cpu")
embeddings = model.encode(
    headlines,
    batch_size=64,
    normalize_embeddings=True,  # makes similarity a simple dot product
)
# embeddings.shape -> (n_headlines, 384)
`}</CodeBlock>
        <p>
          Those two Fed headlines from earlier score <B>0.607</B> similarity, even though they share almost no words.
          That’s the whole point.
        </p>
        <p>
          <B>Tip:</B> install the CPU-only build of PyTorch. It’s ~200 MB instead of ~2.5 GB and you don’t need a GPU
          for this:
        </p>
        <CodeBlock language="bash">{`pip install torch --index-url https://download.pytorch.org/whl/cpu`}</CodeBlock>
      </ReportSection>

      <ReportSection id="dedupe" title="Step 2: Dedupe, collapsing rewrites into one story">
        <p>
          If two headlines score <B>0.9 or higher</B>, they’re the same story. But <em>how</em> you group them
          matters.
        </p>
        <p>
          The obvious approach (“link everything that’s similar”) has a bug called <B>chaining</B>: A looks like B, B
          looks like C, so A and C get merged even though they’re about different things.
        </p>
        <p>
          Instead I use <B>leader clustering</B>: walk the list, and each headline that isn’t taken yet becomes a
          “leader” that grabs everything close to <em>it</em>. Nothing gets merged through a middleman.
        </p>
        <CodeBlock language="Python">{`
def leader_cluster(emb, threshold=0.9):
    story_id = np.full(len(emb), -1)
    next_id = 0
    for i in range(len(emb)):
        if story_id[i] != -1:
            continue  # already part of a story
        unassigned = np.flatnonzero(story_id == -1)
        sims = emb[unassigned] @ emb[i]          # similarity to the leader
        story_id[unassigned[sims >= threshold]] = next_id
        next_id += 1
    return story_id
`}</CodeBlock>
        <p>
          The important part: <B>don’t throw the duplicates away.</B> I keep two things per story:
        </p>
        <List>
          <li>
            <Code>dup_count</Code>: how many times it was rewritten. A story covered 40 times counts as 40, not 1.
            That’s a size signal.
          </li>
          <li>
            <Code>sources</Code>: the <B>set</B> of outlets that ran it (Reuters, BBC, …).
          </li>
        </List>
        <p>
          Why a set and not just a count? Later we add up sources per topic. If Reuters wrote two different stories in
          the same topic, adding counts would count Reuters twice. Merging sets doesn’t.
        </p>
        <p>
          Source names also need cleaning, since <Code>Reuters</Code>, <Code>reuters.com</Code> and{' '}
          <Code>https://www.reuters.com/world/...</Code> are the same outlet:
        </p>
        <CodeBlock language="Python">{`normalize_source("https://www.Reuters.com/world/x")  # -> "reuters"`}</CodeBlock>
      </ReportSection>

      <ReportSection id="cluster" title="Step 3: Cluster, grouping stories into topics">
        <p>Now we have stories. Next we group them into topics (“the Fed”, “AI chips”, “Tesla recall”).</p>
        <p>I used two tools together:</p>
        <List>
          <li>
            <B>HDBSCAN</B> finds groups of points that sit close together. Two things I like about it: it decides{' '}
            <em>how many</em> topics there are on its own, and anything that doesn’t fit gets labelled <B>noise</B>{' '}
            instead of being forced into a group.
          </li>
          <li>
            <B>UMAP</B> goes first. HDBSCAN works badly on 384 dimensions, so UMAP squashes each vector down to 5 while
            keeping similar things close.
          </li>
        </List>
        <CodeBlock language="Python">{`
import umap
from sklearn.cluster import HDBSCAN

reduced = umap.UMAP(
    n_components=5,
    metric="cosine",   # same similarity measure the embeddings use
    min_dist=0.0,      # pack clusters tightly
).fit_transform(story_embeddings)

labels = HDBSCAN(min_cluster_size=mcs).fit_predict(reduced)
# label -1 = noise
`}</CodeBlock>

        <H3>How big does a topic need to be?</H3>
        <p>
          <Code>min_cluster_size</Code> is the smallest group HDBSCAN will call a topic. The right value depends on how
          much data you have, and that changes every run. So it’s set from the story count:
        </p>
        <CodeBlock language="Python">{`min_cluster_size = max(2, min(100, round(n_stories * 0.005)))`}</CodeBlock>
        <ReportTable columns={['Stories', 'min_cluster_size']} rows={MCS_ROWS} />

        <H3>Naming each topic</H3>
        <p>
          To label a cluster, I glue all its headlines into one document and find the words that are common{' '}
          <em>here</em> but rare in the other clusters (class-based TF-IDF, the same trick BERTopic uses). The Fed
          cluster comes out as something like <Code>fed, rates, inflation, federal reserve</Code>.
        </p>
      </ReportSection>

      <ReportSection id="split" title="Step 4: Split, un-gluing topics that are really two stories">
        <p>
          HDBSCAN isn’t perfect. Sometimes it glues several real stories into one topic, like Ukraine, Gaza and
          ceasefire talks all landing in one “war” cluster. So before ranking anything, I check how <B>tight</B> each
          cluster is.
        </p>

        <H3>Coherence: how much a cluster agrees with itself</H3>
        <p>
          Take the average of all the cluster’s vectors. That’s its <B>centroid</B>, the “center of meaning”. Then
          measure how similar each headline is to that center, and average it:
        </p>
        <CodeBlock language="Python">{`
def coherence(emb, weights):            # weights = dup_count per story
    c = (weights[:, None] * emb).sum(0) / weights.sum()
    c /= np.linalg.norm(c)              # centroid
    return np.average(emb @ c, weights=weights)
`}</CodeBlock>
        <p>
          Two details: it uses the <B>original</B> 384-dim vectors, not UMAP’s squashed ones (UMAP is great for finding
          clusters but distorts distances, so it’s bad for measuring them). And it’s weighted by duplicate count, so a
          story rewritten 40 times counts more.
        </p>

        <H3>The split rule</H3>
        <OrderedList>
          <li>
            Any cluster with coherence below a threshold gets a split attempt: cut it in two (agglomerative clustering,
            k=2).
          </li>
          <li>
            Keep the cut <B>only if it’s a real improvement</B>: both halves have at least 5 stories, <em>and</em> their
            coherence beats the parent’s by at least 0.05.
          </li>
          <li>Halves that are still loose get split again, up to 3 levels deep (max 8 pieces).</li>
          <li>
            <B>Then</B> anything still below a lower threshold gets dropped as noise.
          </li>
        </OrderedList>
        <p>
          The order is the important bit. A cluster with terrible coherence is often two <em>good</em> stories glued
          together. Drop first, and you throw away both. Split first, and you rescue them.
        </p>
        <p>
          Rule 2 matters too. My first idea was “keep the split if each half is tighter than the parent”. But cutting{' '}
          <em>any</em> group in two makes the halves a bit tighter, even a group that’s genuinely one story. Requiring a
          real gain stops it from shredding good clusters.
        </p>

        <H3>A surprise from testing</H3>
        <p>
          I glued the earthquake and the Portugal election clusters together on purpose, to see if the split would
          catch it. The blob scored <B>0.59</B> coherence, above my 0.5 threshold, so it was never even tried.
        </p>
        <p>
          Why? Each headline is compared to a centroid sitting <em>halfway between</em> the two stories, so everyone
          gets partial credit. Raising the threshold to 0.65 split it cleanly into 0.78 + 0.80, while Ukraine (0.64,
          genuinely one story) was tried and <B>correctly left alone</B> thanks to the gain check.
        </p>
        <p>
          So I raised the default to <B>0.65</B>. A high threshold is safe: the worst case is a few extra split attempts
          that the gain check throws out. The script also prints a coherence histogram every run, so I’ll fine-tune it
          from real data.
        </p>
      </ReportSection>

      <ReportSection id="rank" title="Step 5: Rank, finding what actually matters right now">
        <p>The easy answer is to sort by size. Here’s why that’s wrong:</p>
        <Callout>
          <p>
            <B>Topic A:</B> Ukraine coverage, ~300 headlines a day, every day for months.
          </p>
          <p>
            <B>Topic B:</B> A major earthquake. Zero headlines yesterday, 300 today.
          </p>
        </Callout>
        <p>Same size, but B is the bigger news. So I score each topic on three signals:</p>
        <ReportTable columns={['Signal', 'What it means', 'Why it’s there']} rows={SIGNAL_ROWS} />

        <H3>Velocity in plain English</H3>
        <p>
          Take the time span of the whole run and cut it in half. Count each topic’s headlines in the older half and the
          recent half, then divide:
        </p>
        <CodeBlock language="Python">{`velocity = (recent + 1) / (older + 1)   # +1 so brand-new topics don't divide by zero`}</CodeBlock>
        <ReportTable columns={['Topic', 'Older half', 'Recent half', 'Velocity']} rows={VELOCITY_ROWS} />
        <p>Two details that matter:</p>
        <OrderedList>
          <li>
            <B>Every topic uses the same cut.</B> If each topic got its own time window, a 6-hour burst would look
            “steady” inside its own 6 hours.
          </li>
          <li>
            <B>Velocity counts every raw headline, duplicates included.</B> The duplicates are what make a burst look
            like a burst. Since topics are attached to stories and timestamps are attached to headlines, ranking joins
            the two on <Code>story_id</Code>.
          </li>
        </OrderedList>

        <H3>The score, version 1</H3>
        <CodeBlock language="Python">{`score = 0.5 * log(sources) + 0.3 * log(size) + 0.2 * log(velocity)`}</CodeBlock>
        <p>
          Why logs everywhere? Size ranges from 20 to 3,000, and one giant topic would drown out everything else. Logs
          shrink that range.
        </p>
        <p>
          Velocity needs the log most. Without it, the earthquake’s 301 × 0.2 = 60 would be ~97% of its score, and every
          new topic would win just for being new. With the log:
        </p>
        <List>
          <li>
            steady topics add <B>0</B>
          </li>
          <li>breaking topics get a boost (+1.14 for the earthquake)</li>
          <li>fading topics lose a little</li>
        </List>
        <p>So sources and size decide most of the ranking, and velocity moves topics up or down from there.</p>

        <H3>The score, version 2</H3>
        <p>
          Version 1 had two problems. The terms were still on different scales, and velocity was fooled by busy news
          days: when <em>everything</em> gets more coverage, everything looks like it’s surging.
        </p>
        <p>
          Fix one: <B>velocity uses shares, not counts.</B> Instead of “how many headlines did this topic get?”, ask
          “what <em>slice</em> of all the news did it get?” in each half:
        </p>
        <CodeBlock language="Python">{`
recent_share   = (recent + 1)   / (all_recent   + n_topics)
previous_share = (previous + 1) / (all_previous + n_topics)
velocity = log(recent_share / previous_share)
`}</CodeBlock>
        <p>
          (The +1 goes on the counts, not the shares. Shares are tiny numbers like 0.04, and adding 1 to them would
          flatten every velocity to zero.)
        </p>
        <p>
          Fix two: <B>normalize every term to 0–1</B> across the topics, then weight them (how to normalize turned out
          to be its own story, below). And a fourth term joins: coherence, so tight, clear topics get a small bonus.
        </p>
        <CodeBlock language="Python">{`score = 0.45 * sources + 0.25 * size + 0.20 * velocity + 0.10 * coherence`}</CodeBlock>
        <p>
          All the weights and thresholds live in one <Code>config.toml</Code>, so tuning doesn’t mean touching code.
        </p>

        <H3>Version 2.1: two more fixes after review</H3>
        <p>
          <B>A dead zone for velocity.</B> With share-based velocity, steady Ukraine scored −0.23. That’s mathematically
          right (the earthquake took a bigger slice of the news, so Ukraine’s slice shrank), but it’s wobble, not news.
          Now anything within ±0.3 counts as exactly 0. Steady stories score neutral, and only real surges and fades
          move the ranking.
        </p>
        <CodeBlock language="Python">{`velocity = 0 if abs(velocity) < 0.3 else velocity`}</CodeBlock>
        <p>
          <B>Picking the right way to normalize.</B> I tried three:
        </p>
        <ReportTable columns={['Method', 'Problem', 'Result on my test data']} rows={NORMALIZE_ROWS} />
        <p>
          Percentile ranks sounded like the safe, robust choice. The test data showed otherwise, which is exactly why I
          print every term before trusting the order.
        </p>

        <H3>The result</H3>
        <p>
          The script prints every term, raw and normalized, so you can see <em>why</em> each topic landed where it did:
        </p>
        <CodeBlock>{RANK_OUTPUT}</CodeBlock>
        <p>
          The breaking earthquake wins. The spam crypto token has the <em>most</em> headlines but ranks <B>last</B>,
          because they come from a handful of outlets, and sources carries the most weight.
        </p>
        <p>
          One honest caveat: with only 5 test topics, the smallest one still gets 0 on size, which is why the Fed sits
          below the fading election. That’s the nature of scaling to a range. On a real day with hundreds of topics, it
          matters far less.
        </p>
      </ReportSection>

      <ReportSection id="representatives" title="Step 6: Picking representatives">
        <p>
          A reader doesn’t need all 300 earthquake headlines. It needs the 5 that best describe it. For each top topic:
        </p>
        <OrderedList>
          <li>Sort its stories by similarity to the centroid (the same function coherence uses).</li>
          <li>
            Greedily pick the closest one that brings a <B>new outlet</B>, so you don’t get five Reuters rewrites.
          </li>
          <li>Never pick a stray. Headlines far from the centroid are excluded, even if they’d add a new outlet.</li>
        </OrderedList>
        <p>
          That third rule came from a bug: my spam cluster had a few unrelated headlines (a bakery award, a deep-sea
          octopus) pulled in by HDBSCAN. The “new outlet” rule happily picked them, because they <em>were</em> new
          outlets. Now they’re filtered out before picking.
        </p>
        <p>The output is a small JSON file: top 20 topics, 5 headlines each.</p>
      </ReportSection>

      <ReportSection id="report" title="Step 7: Writing the report">
        <p>
          My ranking is full of numbers like <Code>velocity +2.47</Code> and <Code>coherence 0.64</Code>. Those mean
          nothing to a reader. A log share ratio isn’t something you can read off a bare number.
        </p>

        <H3>Code translates the numbers into words</H3>
        <p>So Python translates every metric into plain language. It’s deterministic and testable:</p>
        <ReportTable columns={['Metric', 'What the report says']} rows={REPORT_ROWS} />
        <p>
          Here’s a sample report, the full <Code>report.md</Code> from my test run:
        </p>
        <CodeBlock language="Markdown">{SAMPLE_REPORT}</CodeBlock>
      </ReportSection>

      <ReportSection id="stack" title="The stack">
        <List>
          <li>
            <Code>sentence-transformers</Code> (all-MiniLM-L6-v2) for embeddings
          </li>
          <li>
            <Code>umap-learn</Code> + scikit-learn’s <Code>HDBSCAN</Code> for clustering
          </li>
          <li>scikit-learn TF-IDF for labels</li>
          <li>pandas + numpy for everything else</li>
        </List>
        <p>No GPU, no API keys, no LLM calls.</p>
      </ReportSection>
    </ReportLayout>
  )
}
