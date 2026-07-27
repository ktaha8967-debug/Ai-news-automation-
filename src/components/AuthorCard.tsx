import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, Twitter, Linkedin } from 'lucide-react';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-brand-500/50 shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/authors/${author.slug}`}>
              <h3 className="text-lg font-bold text-white hover:text-brand-300 transition-colors font-display">
                {author.name}
              </h3>
            </Link>
            <span title="E-E-A-T Verified Author">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
            </span>
          </div>
          <p className="text-xs text-brand-400 font-medium">{author.role}</p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{author.verifiedCount} Fact-Checked Articles Published</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {author.bio}
      </p>

      {author.credentials && author.credentials.length > 0 && (
        <div className="pt-3 border-t border-slate-800 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Credentials & Expertise</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {author.credentials.map((cred, idx) => (
              <span key={idx} className="bg-slate-950 text-slate-300 text-[11px] px-2 py-0.5 rounded border border-slate-800">
                {cred}
              </span>
            ))}
          </div>
        </div>
      )}

      {(author.twitter || author.linkedin) && (
        <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
          {author.twitter && (
            <a href={author.twitter} target="_blank" rel="noreferrer" className="hover:text-brand-400 flex items-center gap-1">
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>
          )}
          {author.linkedin && (
            <a href={author.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-400 flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
