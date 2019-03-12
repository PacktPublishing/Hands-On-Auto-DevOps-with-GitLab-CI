# GitLab CI Custom Infrastructure

## Purpose

This directory provides example Ansible playbooks used automatic installation
of GitLab CI infrastructure in the course Hands-On Auto DevOps with GitLab CI.
It installs a GitLab CE server and three sample runners: one shell runner
for gitlab.com, an autoscaling runner for gitlab.com, and a shell
runner for the private GitLab CE server.

**NOTE**: This is intended as an example and is not currently ready for
production use. It can be made ready for production use, but you will need
to set up SSL (e.g. by adding an AWS Elastic Load Balancer) and you will
need to configure the AWS security groups to be more restrictive. You should
also encrypt the tokens used to connect runners to the GitLab server.

## Prerequisites

This directory has the necessary configuration for AWS (but see the
Customization section below). There are a few things you will need.

1. Make sure you have Ansible installed and that you have the `boto`
   and `boto3` Python libraries installed. These are needed to communicate
   with AWS from Ansible.
1. Configure your AWS environment using the standard files in `$HOME/.aws`.
   Basically if the AWS CLI works you are good here.
1. Set the environment variable `AWS_REGION` to your preferred region.
1. Install required roles from Ansible Galaxy. You can run the command
   `ansible-galaxy install -r requirements.yaml`.
1. Make sure the private key you use for AWS is in `$HOME/.ssh/id_rsa_aws`,
   or update the variable in `group_vars/ec2.yaml`.
1. Configure the token variables in the `group_vars/gitlab-runner-*.yaml`
   files to match your actual GitLab server or project.

## Use

Once the prerequisites are complete, you can create machines in AWS:

```
ansible-playbook -i localhost, aws-deploy.yaml
```

Note the comma after `localhost`; this is needed to show that we are
providing a list of hosts rather than an inventory file.

Next, SSH into each instance a single time so you can save SSH host keys. You
can get the public IPs from the AWS EC2 console.

Then you can run Ansible to provision the machines:

```
ansible-playbook -i aws playbook.yaml
```

Finally, if you want to use the GitLab autoscaling feature, SSH into the
"gitlab-runner-public" machine and update the `docker.machine` section in
`/etc/gitlab/config.toml` with your AWS info.

Here is a template of the `docker.machine` section to fill in:

```
MachineDriver = "amazonec2"
MachineName = "gitlab-docker-machine-%s"
MachineOptions = [
  "amazonec2-access-key=XXX",
  "amazonec2-secret-key=XXX",
  "amazonec2-region=XXX",
  "amazonec2-vpc-id=vpc-XXX",
  "amazonec2-subnet-id=subnet-XXX",
  "amazonec2-zone=x",
  "amazonec2-use-private-address=true",
  "amazonec2-tags=runner-manager-name,gitlab-aws-autoscaler,gitlab,true,gitlab-runner-autoscale,true",
  "amazonec2-instance-type=t2.medium",
]
```

The `amazonec2-zone` should be a single letter like `a` and should match the
availability zone of the subnet.

## Customization

In addition to the prerequisites above, you probably also want to look
through all the configuration and customize to your needs. You can review the
files for comments indicating what can be customized.

You can also use this directory with a different cloud provider or with
regular physical or virtual machines. The `inventory` file in this directory
is intended for this purpose; as long as the machines are reachable using
those names, have Python installed, and support passwordless SSH and
passwordless `sudo`, you should be able to provision using this directory
as follows:

```
ansible-playbook -i inventory playbook.yaml
```

## Cleanup

If using AWS for sandbox purposes, you can clean up by terminating all
instances and then deleting the `gitlab` VPC.
