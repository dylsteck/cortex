import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Widget } from "../widget";
import { cortexAPI } from "@/lib/utils";
import { Proposal } from "@/lib/types";

const ProposalCard = ({ proposal, onClick }: { proposal: Proposal; onClick: () => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className="border rounded-lg p-4 space-y-2 cursor-pointer hover:shadow-lg transition-shadow"
    >
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{proposal.title}</h3>
            <span className="text-sm text-gray-500">#{proposal.proposalNumber}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>
        <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
                <span className="text-green-500">For:</span>
                <span>{proposal.forVotes}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-red-500">Against:</span>
                <span>{proposal.againstVotes}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-gray-500">Abstain:</span>
                <span>{proposal.abstainVotes}</span>
            </div>
        </div>
        <div className="text-xs text-gray-500">
            Created: {new Date(parseInt(proposal.timeCreated) * 1000).toLocaleDateString()}
        </div>
    </motion.div>
);

const ProposalDetail = ({ proposal, onBack }: { proposal: Proposal; onBack: () => void }) => (
    <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="space-y-4"
    >
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Proposals
        </button>
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">{proposal.title}</h2>
                <span className="text-sm text-gray-500">Proposal #{proposal.proposalNumber}</span>
            </div>
            <div className="prose max-w-none">
                <p>{proposal.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-600 font-semibold">For</div>
                    <div className="text-2xl font-bold">{proposal.forVotes}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-red-600 font-semibold">Against</div>
                    <div className="text-2xl font-bold">{proposal.againstVotes}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600 font-semibold">Abstain</div>
                    <div className="text-2xl font-bold">{proposal.abstainVotes}</div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-sm text-gray-600">
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(parseInt(proposal.timeCreated) * 1000).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                    <span className="font-semibold">Proposer:</span>{" "}
                    {proposal.proposer}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function NounsBuilderProposals({ contractAddress }: { contractAddress: string }) {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

    useEffect(() => {
        if (contractAddress) {
            setLoading(true);
            cortexAPI.getNounsBuilderProposals(contractAddress)
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setProposals(data.proposals);
                })
                .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch proposals'))
                .finally(() => setLoading(false));
        }
    }, [contractAddress]);

    const sortedProposals = useMemo(() => {
        return [...proposals].sort((a, b) => b.proposalNumber - a.proposalNumber);
    }, [proposals]);

    if (loading) {
        return (
            <Widget className="relative">
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full size-8 border-b-2 border-gray-400" />
                </div>
            </Widget>
        );
    }

    if (error) {
        return (
            <Widget className="relative">
                <div className="p-4 text-red-500">Error: {error}</div>
            </Widget>
        );
    }

    return (
        <Widget className="relative">
            <div className="p-4">
                <AnimatePresence mode="wait">
                    {selectedProposal ? (
                        <ProposalDetail
                            key="detail"
                            proposal={selectedProposal}
                            onBack={() => setSelectedProposal(null)}
                        />
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <h2 className="text-xl font-bold">Proposals</h2>
                            <div className="space-y-4">
                                {sortedProposals.length > 0 ? (
                                    sortedProposals.map((proposal) => (
                                        <ProposalCard
                                            key={proposal.proposalId}
                                            proposal={proposal}
                                            onClick={() => setSelectedProposal(proposal)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-gray-500">No proposals found</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Widget>
    );
}
