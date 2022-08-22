import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {patch, append, updateItem } from '@ngxs/store/operators';
import { BallotOption } from "../interfaces/ballot-option";
import { QuickRankModel } from "../interfaces/quick-rank-model";
import { AddUpdateBallotOption, CastVote } from "./actions";

export interface VoteTally{
    id: string;
    display: string;
    count: number;
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

    @Selector()
    static results(state: QuickRankModel){
        console.log("In Select results");
        let optionsInEliminationOrder: VoteTally[] = [];
        let availableOptions = state.ballotOptions.map(o => o.id!);
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
        }
        if(availableOptions.length === 1){
            let numberOfVotes = state.votes.map(r => r.find(i => availableOptions.includes(i))).filter(v => v !== undefined).map(v => v!).length;
            optionsInEliminationOrder.push({"id": availableOptions[0], "count": numberOfVotes, "display": state.ballotOptions.find(o => o.id == availableOptions[0])!.display})
        }

        return optionsInEliminationOrder.reverse();
    }
}