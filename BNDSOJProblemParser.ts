import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class BNDSOJProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['https://onlinejudge.bnds.cn/*']; //to lazy to do the regex expression :(
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    console.log("Start set succesfully! \n")
    const elem = htmlToElement(html);
    const task = new TaskBuilder('BNDSOJProblemParser').setUrl(url);
	var tmp = elem.getElementsByClassName("col-md-8 problem-view")[0]
	var Name = tmp.getElementsByTagName("h3")[0].textContent
	task.setTimeLimit(2.0)
	task.setMemoryLimit(512.0)
	task.setName(Name.trim())
	console.log("Debug #1 set succesfully")
	var l1 = elem.getElementsByClassName("input"), l2 = elem.getElementsByClassName("output")
	if(l1.length != l2.length) console.log("Error #1 len is not equal")
	for(var i = 0; i < l1.length; i++) {
		var _1 = l1[i], _2 = l2[i]
		task.addTest(_1.getElementsByTagName("pre")[0].textContent, _2.getElementsByTagName("pre")[0].textContent)
	}
    return task.build();
  }
}