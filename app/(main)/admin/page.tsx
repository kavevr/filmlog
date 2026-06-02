"use client";

import { useState, useMemo } from "react";
import {
  Settings,
  Plus,
  Pencil,
  Trash2,
  Film,
  Tv,
  Sparkles,
  TrendingUp,
  Eye,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { useMediaStore, type MediaCategory } from "@/store/media";
import type { MediaItem, AccentColor } from "@/types/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

/* ── Config ── */
const categories: { key: MediaCategory; label: string; icon: React.ReactNode }[] = [
  { key: "movies", label: "电影", icon: <Film className="size-4" /> },
  { key: "tv", label: "剧集", icon: <Tv className="size-4" /> },
  { key: "anime", label: "动漫", icon: <Sparkles className="size-4" /> },
  { key: "adultAnime", label: "成人动漫", icon: <Eye className="size-4" /> },
  { key: "adultAmateur", label: "素人", icon: <Eye className="size-4" /> },
  { key: "onlyfans", label: "OnlyFans", icon: <DollarSign className="size-4" /> },
];

const accents: AccentColor[] = ["cyan", "purple", "rose", "pink", "amber"];

const emptyItem: MediaItem = {
  title: "", year: "", rating: "", genre: "",
  poster: "bg-linear-to-br from-cyan-500/30 to-blue-800/40",
  accent: "cyan",
};

/* ── Page ── */
export default function AdminPage() {
  const store = useMediaStore();
  const [selCategory, setSelCategory] = useState<MediaCategory>("movies");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<MediaItem>(emptyItem);
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    const raw = store.getByCategory(selCategory);
    if (!search.trim()) return raw;
    const q = search.toLowerCase();
    return raw.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q)
    );
  }, [selCategory, search, store]);

  /* ── Stats ── */
  const stats = useMemo(() => {
    const all = [
      ...store.movies, ...store.tv, ...store.anime,
      ...store.adultAnime, ...store.adultAmateur, ...store.onlyfans,
    ];
    return {
      total: all.length,
      movies: store.movies.length,
      tv: store.tv.length,
      anime: store.anime.length + store.adultAnime.length,
      adult: store.adultAnime.length + store.adultAmateur.length + store.onlyfans.length,
    };
  }, [store]);

  /* ── Handlers ── */
  const openAdd = () => { setEditIdx(null); setForm(emptyItem); setDialogOpen(true); };
  const openEdit = (i: number) => { setEditIdx(i); setForm(items[i]); setDialogOpen(true); };
  const confirmDelete = (i: number) => { setEditIdx(i); setDeleteOpen(true); };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("标题不能为空"); return; }
    if (editIdx !== null) {
      store.updateItem(selCategory, editIdx, form);
      toast.success("更新成功");
    } else {
      store.addItem(selCategory, form);
      toast.success("新增成功");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (editIdx !== null) {
      store.deleteItem(selCategory, editIdx);
      toast.success("删除成功");
    }
    setDeleteOpen(false);
  };

  const setField = (field: keyof MediaItem, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const cat = categories.find((c) => c.key === selCategory);

  return (
    <main className="flex-1">
      {/* Header */}
      <section className="border-b border-white/4 px-4 pt-32 pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-400">
                <Settings className="h-3.5 w-3.5" />
                <span>Admin</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">管理面板</h1>
              <p className="mt-1 text-sm text-muted-foreground">管理所有媒体数据</p>
            </div>
            <Button onClick={openAdd} className="rounded-full gap-1.5">
              <Plus className="h-4 w-4" /> 新增
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-5 dark:*:data-[slot=card]:bg-card mb-8">
          <Card>
            <CardHeader>
              <CardDescription>总计</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{stats.total}</CardTitle>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">全部媒体条目</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>电影</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{stats.movies}</CardTitle>
              <CardAction>
                <Badge variant="outline" className="gap-1"><Film className="size-3" />电影</Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">Movies collection</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>剧集</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{stats.tv}</CardTitle>
              <CardAction>
                <Badge variant="outline" className="gap-1"><Tv className="size-3" />剧集</Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">TV Shows collection</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>动漫</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{stats.anime}</CardTitle>
              <CardAction>
                <Badge variant="outline" className="gap-1"><Sparkles className="size-3" />动漫</Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">Anime collection</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>成人</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{stats.adult}</CardTitle>
              <CardAction>
                <Badge variant="outline" className="gap-1"><Eye className="size-3" />成人</Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">Adult collection</CardFooter>
          </Card>
        </div>

        {/* Tabs + Table */}
        <Tabs defaultValue="movies" value={selCategory} onValueChange={(v) => setSelCategory(v as MediaCategory)} className="w-full">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <TabsList className="flex-wrap">
              {categories.map((c) => (
                <TabsTrigger key={c.key} value={c.key} className="gap-1.5">
                  {c.icon}
                  <span className="hidden sm:inline">{c.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <Input
              placeholder="搜索标题或类型..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 rounded-full"
            />
          </div>

          {categories.map((c) => (
            <TabsContent key={c.key} value={c.key} className="mt-0">
              <div className="overflow-hidden rounded-xl border border-white/8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/6 hover:bg-transparent">
                      <TableHead className="text-muted-foreground text-xs w-8">#</TableHead>
                      <TableHead className="text-muted-foreground text-xs">标题</TableHead>
                      <TableHead className="text-muted-foreground text-xs">年份</TableHead>
                      <TableHead className="text-muted-foreground text-xs">评分</TableHead>
                      <TableHead className="text-muted-foreground text-xs hidden sm:table-cell">类型</TableHead>
                      <TableHead className="text-muted-foreground text-xs hidden md:table-cell">Accent</TableHead>
                      <TableHead className="text-muted-foreground text-xs w-24">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow key={i} className="border-white/4 hover:bg-white/3">
                        <TableCell className="text-xs text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium text-foreground text-sm">
                          {item.title}
                          {item.variant === "adult" && (
                            <Badge variant="outline" className="ml-2 text-[10px] px-1 py-0">18+</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.year}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.rating}</TableCell>
                        <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{item.genre}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-[10px] px-1.5">{item.accent}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon-xs" onClick={() => openEdit(i)}
                              className="h-7 w-7 rounded-lg hover:bg-white/8">
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" onClick={() => confirmDelete(i)}
                              className="h-7 w-7 rounded-lg hover:bg-rose-400/10 hover:text-rose-400">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {items.length === 0 && (
                      <TableRow className="border-white/4">
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                          {search ? "没有匹配的结果" : "暂无数据，点击右上角「新增」按钮添加"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground px-1">
                共 {items.length} 条记录
                {search && `（已筛选，总计 ${store.getByCategory(selCategory).length} 条）`}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-white/8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editIdx !== null ? "编辑条目" : "新增条目"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="title">标题 *</Label>
              <Input id="title" value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="输入标题" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="year">年份</Label>
                <Input id="year" value={form.year} onChange={(e) => setField("year", e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="rating">评分</Label>
                <Input id="rating" value={form.rating} onChange={(e) => setField("rating", e.target.value)} placeholder="8.5" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="genre">类型</Label>
              <Input id="genre" value={form.genre} onChange={(e) => setField("genre", e.target.value)}
                placeholder="Sci-Fi / Drama" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="director">导演</Label>
              <Input id="director" value={form.director ?? ""}
                onChange={(e) => setField("director", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="seasons">季数</Label>
                <Input id="seasons" type="number" value={form.seasons ?? ""}
                  onChange={(e) => setField("seasons", e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="episodes">集数</Label>
                <Input id="episodes" type="number" value={form.episodes ?? ""}
                  onChange={(e) => setField("episodes", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Accent 颜色</Label>
                <Select value={form.accent} onValueChange={(v) => setField("accent", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accents.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Variant</Label>
                <Select value={form.variant ?? "default"}
                  onValueChange={(v) => setField("variant", v === "default" ? "" : v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="adult">Adult</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="poster">Poster (Tailwind class)</Label>
              <Input id="poster" value={form.poster}
                onChange={(e) => setField("poster", e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm bg-card border-white/8">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            确定要删除「{editIdx !== null ? items[editIdx]?.title : ""}」吗？此操作不可撤销。
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={handleDelete}>删除</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
