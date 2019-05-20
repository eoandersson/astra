package sling_project.project_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import sling_project.project_service.ProjectApplication;

@EnableEurekaClient
@SpringBootApplication
public class ProjectApplication 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(ProjectApplication.class, args);
    }
}
