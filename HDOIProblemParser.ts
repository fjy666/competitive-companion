import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class HDOIProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['https://hdoi.cn/problem/*']; //to lazy to do the regex expression :(
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    console.log("Start set succesfully! \n")
    const elem = htmlToElement(html);
    const task = new TaskBuilder('HDOIProblemParser').setUrl(url);
	var s = elem.getElementsByClassName("panel-title")[0]
	task.setName(s.getElementsByTagName("span")[0].textContent)
	task.setTimeLimit(2.0)
	task.setMemoryLimit(256.0)
	console.log("Debug #1 Complete")
	var l1 = elem.getElementsByClassName("example-input"),l2 = elem.getElementsByClassName("example-output")
	for(var i = 0; i < l1.length; ++i) {
		task.addTest(l1[i].getElementsByTagName("pre")[0].textContent, l2[i].getElementsByTagName("pre")[0].textContent)
	}
    return task.build();
  }
}