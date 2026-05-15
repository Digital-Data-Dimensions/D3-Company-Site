'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { PROJECT_IMAGES, type ProjectImage } from '@/lib/projects';

type Solution = NonNullable<ProjectImage['solution']>;
type Industry = NonNullable<ProjectImage['industry']>;

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function formatTitle(p: ProjectImage) {
  return p.location ? `${p.client} — ${p.location}` : p.client;
}

function groupByClient(items: ProjectImage[]) {
  const map = new Map<string, ProjectImage[]>();
  for (const item of items) {
    const key = item.client;
    const list = map.get(key);
    if (list) list.push(item);
    else map.set(key, [item]);
  }
  return Array.from(map.entries()).map(([client, images]) => ({ client, images }));
}

function groupSummary(images: ProjectImage[]) {
  if (images.length === 1 && images[0].branches?.length) {
    const n = images[0].branches.length;
    return `${n} branch${n === 1 ? '' : 'es'}`;
  }
  return `${images.length} photo${images.length === 1 ? '' : 's'}`;
}

function ProjectCard({ project }: { project: ProjectImage }) {
  const title = formatTitle(project);
  const singleWithBranches = !!project.branches?.length;

  return (
    <div className={`pg-card${singleWithBranches ? ' pg-card--featured' : ''}`}>
      <div className="pg-media">
        {project.src ? (
          <Image
            src={project.src}
            alt={project.alt}
            width={1600}
            height={1200}
            sizes={
              singleWithBranches
                ? '(max-width: 720px) 100vw, min(640px, 50vw)'
                : '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            className="pg-img"
          />
        ) : (
          <div className="pg-placeholder">{title}</div>
        )}
      </div>
      {project.branches && project.branches.length > 0 && (
        <div className="pg-branches" aria-label={`${project.client} branches`}>
          <div className="pg-branches-label">Branches</div>
          <ul className="pg-branches-list">
            {project.branches.map((branch) => (
              <li key={branch} className="pg-branch-chip">
                {branch}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ProjectsGallery() {
  const solutions = useMemo(() => {
    const list = PROJECT_IMAGES.map((p) => p.solution).filter(Boolean) as Solution[];
    return ['All', ...uniq(list)] as const;
  }, []);

  const industries = useMemo(() => {
    const list = PROJECT_IMAGES.map((p) => p.industry).filter(Boolean) as Industry[];
    return ['All', ...uniq(list)] as const;
  }, []);

  const [activeSolution, setActiveSolution] = useState<(typeof solutions)[number]>('All');
  const [activeIndustry, setActiveIndustry] = useState<(typeof industries)[number]>('All');
  const visible = useMemo(() => {
    return PROJECT_IMAGES.filter((p) => {
      const okSolution = activeSolution === 'All' ? true : p.solution === activeSolution;
      const okIndustry = activeIndustry === 'All' ? true : p.industry === activeIndustry;
      return okSolution && okIndustry;
    });
  }, [activeIndustry, activeSolution]);

  const groups = useMemo(() => groupByClient(visible), [visible]);

  const DEFAULT_VISIBLE_PER_CLIENT = 6;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const isExpanded = (client: string) => !!expanded[client];
  const toggleClient = (client: string) => setExpanded((s) => ({ ...s, [client]: !s[client] }));

  useEffect(() => {
    setExpanded({});
  }, [activeIndustry, activeSolution]);

  return (
    <>
      <div className="pg-filters">
        <div className="pg-filter-row" role="tablist" aria-label="Filter by solution">
          <div className="pg-filter-label">Solution</div>
          <div className="pg-filter-chips">
            {solutions.map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={activeSolution === s}
                className={`pg-chip${activeSolution === s ? ' pg-chip--on' : ''}`}
                onClick={() => setActiveSolution(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pg-filter-row" role="tablist" aria-label="Filter by industry">
          <div className="pg-filter-label">Industry</div>
          <div className="pg-filter-chips">
            {industries.map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={activeIndustry === s}
                className={`pg-chip${activeIndustry === s ? ' pg-chip--on' : ''}`}
                onClick={() => setActiveIndustry(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pg-groups" aria-label="Project gallery grouped by client">
        {groups.map(({ client, images }) => {
          const expandedOn = isExpanded(client);
          const shown = expandedOn ? images : images.slice(0, DEFAULT_VISIBLE_PER_CLIENT);
          const remaining = Math.max(0, images.length - shown.length);

          return (
            <section key={client} className="pg-group">
              <div className="pg-group-head">
                <div>
                  <div className="pg-group-title">{client}</div>
                  <div className="pg-group-sub">{groupSummary(images)}</div>
                </div>
                {images.length > DEFAULT_VISIBLE_PER_CLIENT && (
                  <button type="button" className="pg-group-toggle" onClick={() => toggleClient(client)}>
                    {expandedOn ? 'Show less' : `Show all (${images.length})`}
                  </button>
                )}
              </div>

              <div
                className={`pg-grid${shown.length === 1 && shown[0].branches?.length ? ' pg-grid--single' : ''}`}
                aria-label={`${client} projects`}
              >
                {shown.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>

              {!expandedOn && remaining > 0 && (
                <div className="pg-group-more">+ {remaining} more in {client}</div>
              )}
            </section>
          );
        })}
      </div>

      <style>{`
        .pg-filters{ display:flex; flex-direction:column; gap: 10px; margin-bottom: 18px; }
        .pg-filter-row{ display:flex; align-items:flex-start; gap: 12px; flex-wrap: wrap; }
        .pg-filter-label{
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          padding-top: 9px;
          min-width: 74px;
        }
        .pg-filter-chips{ display:flex; flex-wrap:wrap; gap:10px; }
        .pg-chip{
          appearance:none;
          border:1px solid var(--border);
          background: var(--bg-surface);
          color: var(--muted);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.02em;
          border-radius: 999px;
          padding: 8px 12px;
          cursor:pointer;
          transition: background .2s, color .2s, border-color .2s, transform .2s;
        }
        .pg-chip:hover { border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); transform: translateY(-1px); }
        .pg-chip--on{
          background: var(--heading);
          border-color: var(--heading);
          color: #fff;
        }

        .pg-groups{ display: flex; flex-direction: column; gap: 26px; }
        .pg-group{ padding-top: 4px; }
        .pg-group-head{
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          gap: 16px;
          margin-bottom: 12px;
        }
        .pg-group-title{
          font-size: 18px;
          font-weight: 900;
          color: var(--heading);
          letter-spacing: -0.4px;
          line-height: 1.2;
        }
        .pg-group-sub{
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
          font-weight: 300;
        }
        .pg-group-toggle{
          appearance:none;
          border: 1px solid var(--border);
          background: var(--bg-surface);
          color: var(--heading);
          font-size: 12px;
          font-weight: 400;
          padding: 8px 12px;
          border-radius: 999px;
          cursor:pointer;
          transition: transform .2s, border-color .2s, background .2s;
          white-space: nowrap;
        }
        .pg-group-toggle:hover{
          transform: translateY(-1px);
          border-color: color-mix(in srgb, var(--muted) 35%, var(--border));
        }
        .pg-group-more{
          margin-top: 10px;
          font-size: 12px;
          color: var(--muted);
          font-weight: 400;
        }

        .pg-grid{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .pg-grid--single {
          grid-template-columns: minmax(0, 640px);
        }
        @media (max-width: 1100px) { .pg-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 720px)  {
          .pg-grid{ grid-template-columns: 1fr !important; }
          .pg-grid--single { grid-template-columns: 1fr !important; }
        }

        .pg-card{
          display: flex;
          flex-direction: column;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s, border-color .25s;
        }
        .pg-card:hover{
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: color-mix(in srgb, var(--muted) 30%, var(--border));
        }
        .pg-media{
          width: 100%;
          line-height: 0;
          background: var(--card);
        }
        .pg-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .pg-placeholder{
          display:flex;
          align-items:center;
          justify-content:center;
          min-height: 120px;
          color: var(--muted);
          font-size: 12px;
          font-weight: 400;
          padding: 14px;
          text-align:center;
          background: var(--bg-highlight);
        }
        .pg-branches {
          padding: 16px 18px 18px;
          border-top: 1px solid var(--border);
        }
        .pg-branches-label {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .pg-branches-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pg-branch-chip {
          font-size: 12px;
          font-weight: 400;
          color: var(--heading);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 6px 12px;
        }
      `}</style>
    </>
  );
}
