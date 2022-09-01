import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {patch, append, updateItem } from '@ngxs/store/operators';
import { baseColors } from "ng2-charts";
import { BallotOption } from "../interfaces/ballot-option";
import { QuickRankModel } from "../interfaces/quick-rank-model";
import { AddUpdateBallotOption, CastVote } from "./actions";

export interface VoteTally{
    id: string;
    display: string;
    count: number;
}

export interface VoteRound{
    roundNumber: number;
    tallies: VoteTally[];
    eliminatedId: string;
}

export interface ResultDto{
    winnerId: string;
    winnerDisplay: string;
    rounds: VoteRound[];
    colorMap: Map<string,string>;
}

@State<QuickRankModel>({
    name: 'quickRank',
    defaults: {
        ballotOptions: [],
        votes: []
    }
})
@Injectable()
export class QuickRankState {
    @Action(AddUpdateBallotOption)
    addEditBallotOption(ctx: StateContext<QuickRankModel>, {display, id}: AddUpdateBallotOption) : void {
        console.log("In addEditBallotOption")
        const current = ctx.getState();
        const sequencesDescending = current.ballotOptions.map(bo => bo.sequence).sort((a,b) => b-a);
        const maxSequence = sequencesDescending.length > 0 ? sequencesDescending [0] : -1;
        let currentOption = current.ballotOptions.find(bo => bo.id === id);
        if(id && currentOption){
            console.log(" |-> Edit")
            ctx.setState(patch({
                ballotOptions: updateItem<BallotOption>(bo => bo?.id === id, {...currentOption, display: display })
            }));
        } else {
            console.log(" |-> Add")
            let newOption: BallotOption = {display: display, sequence: maxSequence + 1, id: self.crypto.randomUUID() };
            ctx.setState(patch({
                ballotOptions: append([newOption])
            }));
        }        
    }

    @Action(CastVote)
    castVote(ctx: StateContext<QuickRankModel>, {ranking}: CastVote) : void {
        console.log("In castVote");
        ctx.setState(patch({
            votes: append([ranking])
        }));
    }

    @Selector()
    static ballotOptions(state: QuickRankModel) {
        console.log("In Select ballotOptions");
        return state.ballotOptions;
    }

    static constructColorMap(options :string[]) {
        let sortedOptions = [...options].sort();
        let colorMap = new Map<string, string>();
        let items = sortedOptions.forEach((o,i) => {
            const r = baseColors[i%12][0];
            const g = baseColors[i%12][1];
            const b = baseColors[i%12][2];
            colorMap.set(o, `rgb(${r},${g},${b})`);
        });
        return colorMap;
    }

    @Selector()
    static results(state: QuickRankModel){
        console.log("In Select results");
        let optionsInEliminationOrder: VoteTally[] = [];
        let availableOptions = state.ballotOptions.map(o => o.id!);
        let colorMap = this.constructColorMap(availableOptions);
        let roundNumber = 1;
        let rounds :VoteRound[] = [];
        while(availableOptions.length > 1){
            let votes = state.votes.map(r => r.find(i => availableOptions.includes(i))).filter(v => v !== undefined).map(v => v!);
            let resolvedTallies = new Map<string, number>();
            
            availableOptions.forEach((o) => resolvedTallies.set(o, 0));
            votes.forEach((v) => {
                const current = resolvedTallies.get(v)!;
                resolvedTallies.set(v, current + 1);
            });
            let finalTallies: VoteTally[] = [];
            for(let [key, value] of resolvedTallies){
                console.log(`  ${key}: ${value}`);
                finalTallies.push({"id": key, "count": value, "display": state.ballotOptions.find(o => o.id == key)!.display});
            }
            finalTallies.sort((a, b) => a.count - b.count);
            let removingOption = finalTallies[0];
            console.log(`${removingOption.id}|${removingOption.display} has been eliminated with only ${removingOption.count} votes`);
            optionsInEliminationOrder.push(removingOption);
            availableOptions = availableOptions.filter(o => o != removingOption.id);
            let round :VoteRound = { roundNumber: roundNumber, tallies: finalTallies, eliminatedId: removingOption.id };
            rounds.push(round);
            roundNumber++;
        }
        let result :ResultDto = {rounds: rounds, colorMap: colorMap, winnerId: "", winnerDisplay: ""};
        if(availableOptions.length === 1){
            let numberOfVotes = state.votes.map(r => r.find(i => availableOptions.includes(i))).filter(v => v !== undefined).map(v => v!).length;
            optionsInEliminationOrder.push({"id": availableOptions[0], "count": numberOfVotes, "display": state.ballotOptions.find(o => o.id == availableOptions[0])!.display});
            result.winnerId = availableOptions[0];
            result.winnerDisplay = state.ballotOptions.find(o => o.id == availableOptions[0])!.display;
        }


        return result;
    }
}