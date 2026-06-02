import type { MovieDetail } from "@/types/media";

/* ── Helper: generate a simple detail from a MediaItem ── */
function d(
  id: number,
  main_title: string,
  genres: string[],
  opts?: Partial<Pick<MovieDetail, "imdb_id" | "duration_minutes" | "region_of_origin" | "original_language" | "release_date" | "poster_url">> & {
    aka?: string[];
    directors?: string[];
    actors?: string[];
  },
): MovieDetail {
  const persId = (base: number, i: number) => base * 100 + i;
  return {
    movie_id: id,
    imdb_id: opts?.imdb_id ?? "",
    poster_url: opts?.poster_url ?? "",
    duration_minutes: opts?.duration_minutes ?? 0,
    region_of_origin: opts?.region_of_origin ?? "",
    original_language: opts?.original_language ?? "",
    release_date: opts?.release_date ?? "",
    titles: { main_title, aka: opts?.aka ?? [] },
    genres,
    cast_and_crew: {
      directors: (opts?.directors ?? []).map((name, i) => ({
        person_id: persId(id, i), name,
      })),
      writers: [],
      actors: (opts?.actors ?? []).map((name, i) => ({
        person_id: persId(id, i + 10), name, sequence: i + 1,
      })),
    },
  };
}

export const movieDetails: MovieDetail[] = [
  /* ══════ Movies (1001–1009) ══════ */
  d(1001, "Dune: Part Two", ["科幻", "冒险", "剧情"], {
    imdb_id: "tt15239678", duration_minutes: 166, region_of_origin: "美国",
    original_language: "英语", release_date: "2024-03-01",
    aka: ["沙丘：第二部", "Dune 2"],
    directors: ["Denis Villeneuve"],
    actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"],
  }),
  d(1002, "The Batman", ["动作", "犯罪", "剧情"], {
    imdb_id: "tt1877830", duration_minutes: 176, region_of_origin: "美国",
    original_language: "英语", release_date: "2022-03-04",
    aka: ["新蝙蝠侠", "蝙蝠侠"],
    directors: ["Matt Reeves"],
    actors: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "Colin Farrell"],
  }),
  d(1003, "Interstellar", ["科幻", "剧情", "冒险"], {
    imdb_id: "tt0816692", duration_minutes: 169, region_of_origin: "美国",
    original_language: "英语", release_date: "2014-11-07",
    aka: ["星际穿越", "星際啟示錄"],
    directors: ["Christopher Nolan"],
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
  }),
  d(1004, "Parasite", ["惊悚", "剧情", "喜剧"], {
    imdb_id: "tt6751668", duration_minutes: 132, region_of_origin: "韩国",
    original_language: "韩语", release_date: "2019-05-30",
    aka: ["寄生虫", "寄生上流", "기생충"],
    directors: ["Bong Joon-ho"],
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
  }),
  d(1005, "The Dark Knight", ["动作", "犯罪", "剧情"], {
    imdb_id: "tt0468569", duration_minutes: 152, region_of_origin: "美国",
    original_language: "英语", release_date: "2008-07-18",
    aka: ["黑暗骑士", "蝙蝠侠：黑暗骑士"],
    directors: ["Christopher Nolan"],
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
  }),
  d(1006, "Blade Runner 2049", ["科幻", "惊悚", "剧情"], {
    imdb_id: "tt1856101", duration_minutes: 164, region_of_origin: "美国",
    original_language: "英语", release_date: "2017-10-06",
    aka: ["银翼杀手2049", "銀翼殺手2049"],
    directors: ["Denis Villeneuve"],
    actors: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
  }),
  d(1007, "Spider-Verse", ["动画", "动作", "科幻"], {
    imdb_id: "tt9362722", duration_minutes: 140, region_of_origin: "美国",
    original_language: "英语", release_date: "2023-06-02",
    aka: ["蜘蛛侠：纵横宇宙", "Spider-Man: Across the Spider-Verse"],
    directors: ["Joaquim Dos Santos", "Kemp Powers"],
    actors: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
  }),
  d(1008, "Oppenheimer", ["传记", "剧情", "历史"], {
    imdb_id: "tt15398776", duration_minutes: 180, region_of_origin: "美国",
    original_language: "英语", release_date: "2023-07-21",
    aka: ["奥本海默"],
    directors: ["Christopher Nolan"],
    actors: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
  }),
  d(1009, "Everything Everywhere", ["科幻", "喜剧", "冒险"], {
    imdb_id: "tt6710474", duration_minutes: 139, region_of_origin: "美国",
    original_language: "英语", release_date: "2022-03-25",
    aka: ["瞬息全宇宙", "妈的多重宇宙"],
    directors: ["Daniel Kwan", "Daniel Scheinert"],
    actors: ["Michelle Yeoh", "Ke Huy Quan", "Jamie Lee Curtis"],
  }),

  /* ══════ TV Shows (2001–2009) ══════ */
  d(2001, "Arcane", ["动画", "奇幻", "动作"], {
    imdb_id: "tt11126994", duration_minutes: 41, region_of_origin: "美国",
    original_language: "英语", release_date: "2021-11-06",
    aka: ["英雄联盟：双城之战"],
    directors: ["Pascal Charrue", "Arnaud Delord"],
    actors: ["Hailee Steinfeld", "Ella Purnell", "Kevin Alejandro"],
  }),
  d(2002, "Severance", ["科幻", "惊悚", "剧情"], {
    imdb_id: "tt11280740", duration_minutes: 50, region_of_origin: "美国",
    original_language: "英语", release_date: "2022-02-18",
    aka: ["人生切割术", "离职"],
    directors: ["Ben Stiller", "Aoife McArdle"],
    actors: ["Adam Scott", "Britt Lower", "John Turturro", "Christopher Walken"],
  }),
  d(2003, "The Last of Us", ["剧情", "恐怖", "科幻"], {
    imdb_id: "tt3581920", duration_minutes: 55, region_of_origin: "美国",
    original_language: "英语", release_date: "2023-01-15",
    aka: ["最后生还者"],
    directors: ["Craig Mazin", "Neil Druckmann"],
    actors: ["Pedro Pascal", "Bella Ramsey", "Anna Torv"],
  }),
  d(2004, "Cyberpunk: Edgerunners", ["动画", "科幻", "动作"], {
    imdb_id: "tt12590236", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2022-09-13",
    aka: ["赛博朋克：边缘行者"],
    directors: ["Hiroyuki Imaishi"],
    actors: ["KENN", "Aoi Yūki", "Michiko Kaiden"],
  }),
  d(2005, "Dark", ["科幻", "悬疑", "剧情"], {
    imdb_id: "tt5753856", duration_minutes: 50, region_of_origin: "德国",
    original_language: "德语", release_date: "2017-12-01",
    aka: ["暗黑", "黑暗"],
    directors: ["Baran bo Odar"],
    actors: ["Louis Hofmann", "Lisa Vicari", "Oliver Masucci"],
  }),
  d(2006, "Better Call Saul", ["犯罪", "剧情"], {
    imdb_id: "tt3032476", duration_minutes: 46, region_of_origin: "美国",
    original_language: "英语", release_date: "2015-02-08",
    aka: ["风骚律师", "绝命律师"],
    directors: ["Vince Gilligan", "Peter Gould"],
    actors: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks"],
  }),
  d(2007, "Squid Game", ["惊悚", "剧情", "动作"], {
    imdb_id: "tt10919420", duration_minutes: 55, region_of_origin: "韩国",
    original_language: "韩语", release_date: "2021-09-17",
    aka: ["鱿鱼游戏", "오징어 게임"],
    directors: ["Hwang Dong-hyuk"],
    actors: ["Lee Jung-jae", "Park Hae-soo", "Jung Ho-yeon"],
  }),
  d(2008, "Foundation", ["科幻", "剧情"], {
    imdb_id: "tt0804484", duration_minutes: 55, region_of_origin: "美国",
    original_language: "英语", release_date: "2021-09-24",
    aka: ["基地"],
    directors: ["David S. Goyer"],
    actors: ["Jared Harris", "Lee Pace", "Lou Llobell"],
  }),
  d(2009, "True Detective S1", ["犯罪", "悬疑", "剧情"], {
    imdb_id: "tt2356777", duration_minutes: 60, region_of_origin: "美国",
    original_language: "英语", release_date: "2014-01-12",
    aka: ["真探", "刑警双雄"],
    directors: ["Cary Joji Fukunaga"],
    actors: ["Matthew McConaughey", "Woody Harrelson", "Michelle Monaghan"],
  }),

  /* ══════ Anime (3001–3009) ══════ */
  d(3001, "进击的巨人", ["动作", "黑暗奇幻", "剧情"], {
    imdb_id: "tt2560140", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2013-04-07",
    aka: ["Attack on Titan", "進撃の巨人"],
    directors: ["Tetsurō Araki", "Masashi Koizuka"],
    actors: ["梶裕贵", "石川由依", "井上麻里奈"],
  }),
  d(3002, "鬼灭之刃", ["动作", "超自然", "历史"], {
    imdb_id: "tt9335498", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2019-04-06",
    aka: ["Demon Slayer", "Kimetsu no Yaiba"],
    directors: ["Haruo Sotozaki"],
    actors: ["花江夏树", "鬼头明里", "下野纮"],
  }),
  d(3003, "咒术回战", ["动作", "超自然", "冒险"], {
    imdb_id: "tt12343534", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2020-10-03",
    aka: ["Jujutsu Kaisen", "呪術廻戦"],
    directors: ["Sunghoo Park"],
    actors: ["榎木淳弥", "内田雄马", "濑户麻沙美"],
  }),
  d(3004, "葬送的芙莉莲", ["奇幻", "剧情", "冒险"], {
    imdb_id: "tt28712266", duration_minutes: 25, region_of_origin: "日本",
    original_language: "日语", release_date: "2023-09-29",
    aka: ["Frieren: Beyond Journey's End", "Sousou no Frieren"],
    directors: ["Keiichirō Saitō"],
    actors: ["种崎敦美", "市之濑加那", "小林千晃"],
  }),
  d(3005, "赛博朋克：边缘行者", ["科幻", "动作", "剧情"], {
    imdb_id: "tt12590236", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2022-09-13",
    aka: ["Cyberpunk: Edgerunners"],
    directors: ["Hiroyuki Imaishi"],
    actors: ["KENN", "Aoi Yūki", "Michiko Kaiden"],
  }),
  d(3006, "链锯人", ["动作", "恐怖", "超自然"], {
    imdb_id: "tt13700554", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2022-10-12",
    aka: ["Chainsaw Man", "チェンソーマン"],
    directors: ["Ryū Nakayama"],
    actors: ["户谷菊之介", "楠木灯", "坂田将吾"],
  }),
  d(3007, "间谍过家家", ["喜剧", "动作", "家庭"], {
    imdb_id: "tt13884780", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2022-04-09",
    aka: ["SPY x FAMILY", "スパイファミリー"],
    directors: ["Kazuhiro Furuhashi"],
    actors: ["江口拓也", "种崎敦美", "早见沙织"],
  }),
  d(3008, "Re:Zero", ["异世界", "剧情", "奇幻"], {
    imdb_id: "tt5607616", duration_minutes: 25, region_of_origin: "日本",
    original_language: "日语", release_date: "2016-04-04",
    aka: ["Re:从零开始的异世界生活", "Re:Zero kara Hajimeru Isekai Seikatsu"],
    directors: ["Masaharu Watanabe"],
    actors: ["小林裕介", "高桥李依", "内山夕实"],
  }),
  d(3009, "命运石之门", ["科幻", "惊悚", "剧情"], {
    imdb_id: "tt1910272", duration_minutes: 24, region_of_origin: "日本",
    original_language: "日语", release_date: "2011-04-06",
    aka: ["Steins;Gate", "シュタインズ・ゲート"],
    directors: ["Hiroshi Hamasaki", "Takuya Satō"],
    actors: ["宫野真守", "花泽香菜", "关智一"],
  }),

  /* ══════ Adult Anime (4001–4006) ══════ */
  d(4001, "鬼父", ["成人", "动画"], {
    duration_minutes: 30, region_of_origin: "日本", original_language: "日语",
    release_date: "2018-01-01",
    aka: ["Oni Chichi"],
    directors: ["金澤勝眞"],
  }),
  d(4002, "黒獣", ["成人", "奇幻"], {
    duration_minutes: 30, region_of_origin: "日本", original_language: "日语",
    release_date: "2012-01-01",
    aka: ["Kuroinu", "黒獣～気高き聖女は白濁に染まる～"],
    directors: ["西川貴史"],
  }),
  d(4003, "対魔忍アサギ", ["成人", "动作"], {
    duration_minutes: 30, region_of_origin: "日本", original_language: "日语",
    release_date: "2007-01-01",
    aka: ["Taimanin Asagi"],
    directors: ["むらかみてるあき"],
  }),
  d(4004, "蘭斯", ["成人", "奇幻"], {
    duration_minutes: 28, region_of_origin: "日本", original_language: "日语",
    release_date: "2014-01-01",
    aka: ["Rance", "ランス"],
    directors: ["わたせとしひろ"],
  }),
  d(4005, "宇宙海賊サラ", ["成人", "科幻"], {
    duration_minutes: 30, region_of_origin: "日本", original_language: "日语",
    release_date: "2008-01-01",
    aka: ["Space Pirate Sara", "宇宙海賊サラ"],
    directors: ["ふじもとよしたか"],
  }),
  d(4006, "監獄戦艦", ["成人", "科幻"], {
    duration_minutes: 30, region_of_origin: "日本", original_language: "日语",
    release_date: "2010-01-01",
    aka: ["Prison Battleship", "監獄戦艦～非道の洗脳改造航海～"],
    directors: ["むらかみてるあき"],
  }),

  /* ══════ Adult Amateur (5001–5006) ══════ */
  d(5001, "素人動画コレクション Vol.1", ["素人", "合集"], {
    duration_minutes: 120, region_of_origin: "日本", original_language: "日语",
    release_date: "2024-01-01",
  }),
  d(5002, "初撮り素人娘", ["素人", "初登场"], {
    duration_minutes: 90, region_of_origin: "日本", original_language: "日语",
    release_date: "2023-06-01",
  }),
  d(5003, "素人ナンパ大作戦", ["素人", "搭讪"], {
    duration_minutes: 110, region_of_origin: "日本", original_language: "日语",
    release_date: "2024-03-01",
  }),
  d(5004, "街角素人ガチ交渉", ["素人", "街头"], {
    duration_minutes: 100, region_of_origin: "日本", original_language: "日语",
    release_date: "2023-09-01",
  }),
  d(5005, "素人OL昼休み", ["素人", "办公室"], {
    duration_minutes: 85, region_of_origin: "日本", original_language: "日语",
    release_date: "2024-05-01",
  }),
  d(5006, "地方在住素人妻", ["素人", "人妻"], {
    duration_minutes: 95, region_of_origin: "日本", original_language: "日语",
    release_date: "2023-12-01",
  }),

  /* ══════ OnlyFans (6001–6006) ══════ */
  d(6001, "Sophie Rain", ["OnlyFans", "顶级创作者"], {
    duration_minutes: 0, region_of_origin: "美国", original_language: "英语",
    release_date: "2024-01-01",
    actors: ["Sophie Rain"],
  }),
  d(6002, "Amouranth", ["OnlyFans", "Cosplay"], {
    duration_minutes: 0, region_of_origin: "美国", original_language: "英语",
    release_date: "2023-01-01",
    actors: ["Amouranth"],
  }),
  d(6003, "Belle Delphine", ["OnlyFans", "Cosplay"], {
    duration_minutes: 0, region_of_origin: "英国", original_language: "英语",
    release_date: "2020-01-01",
    actors: ["Belle Delphine"],
  }),
  d(6004, "Corinna Kopf", ["OnlyFans", "生活"], {
    duration_minutes: 0, region_of_origin: "美国", original_language: "英语",
    release_date: "2021-01-01",
    actors: ["Corinna Kopf"],
  }),
  d(6005, "Mia Khalifa", ["OnlyFans", "名人"], {
    duration_minutes: 0, region_of_origin: "美国", original_language: "英语",
    release_date: "2022-01-01",
    actors: ["Mia Khalifa"],
  }),
  d(6006, "Riley Reid", ["OnlyFans", "独家"], {
    duration_minutes: 0, region_of_origin: "美国", original_language: "英语",
    release_date: "2021-01-01",
    actors: ["Riley Reid"],
  }),
];

/** Lookup a detail entry by its movie_id */
export function getDetailById(id: number): MovieDetail | undefined {
  return movieDetails.find((m) => m.movie_id === id);
}

/** Map a media title to its detail (for linking from MediaItem) */
export function getDetailByTitle(title: string): MovieDetail | undefined {
  return movieDetails.find(
    (m) =>
      m.titles.main_title === title ||
      m.titles.aka.includes(title),
  );
}
